import { useCallback, useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import { galleryImages } from '../data/site.js'
import { useFacebookMedia } from '../hooks/useFacebookMedia.js'

const localCaptions = [
  'Sunday worship',
  'In His presence',
  'Praise & song',
  'Fellowship',
  'Word of God',
  'Together in faith',
  'Joyful hearts',
  'Community',
  'Prayer time',
  'Family of God',
  'Lifting hands',
]

// "2026-06-15T03:23:21+0000" -> "Jun 15, 2026"
const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Repeating mosaic rhythm: a couple of larger "feature" tiles among the rest.
// grid-flow-dense fills any gaps so it stays tidy for any photo count.
const spanFor = (i) => {
  const m = i % 6
  if (m === 0) return 'sm:col-span-2 sm:row-span-2'
  if (m === 4) return 'lg:row-span-2'
  return ''
}

export default function Gallery() {
  const [tab, setTab] = useState('photos') // 'photos' | 'videos'
  const [active, setActive] = useState(null) // index into photo items, or null
  const { photos: fbPhotos, videos, configured } = useFacebookMedia()

  // Prefer live Facebook photos; otherwise show local images.
  const items =
    fbPhotos.length > 0
      ? fbPhotos.map((p, i) => ({
          full: p.src,
          thumb: p.thumb || p.src,
          caption: p.caption || localCaptions[i % localCaptions.length],
          date: p.date,
        }))
      : galleryImages.map((src, i) => ({
          full: src,
          thumb: src,
          caption: localCaptions[i % localCaptions.length],
          date: null,
        }))

  const hasVideos = videos.length > 0

  // Group photos by calendar day so each date reads as one "event" category.
  // items are already newest-first, so same-day photos sit consecutively and
  // each running `index` still maps straight into the flat lightbox order.
  const photoGroups = []
  items.forEach((item, index) => {
    const key = item.date ? item.date.slice(0, 10) : 'undated'
    const last = photoGroups[photoGroups.length - 1]
    if (last && last.key === key) last.photos.push({ ...item, index })
    else photoGroups.push({ key, label: item.date ? fmtDate(item.date) : '', photos: [{ ...item, index }] })
  })

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % items.length)),
    [items.length],
  )
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length)),
    [items.length],
  )

  // Keyboard nav + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active, close, next, prev])

  return (
    <section className="container-wide py-[clamp(48px,7vw,84px)]">
      <Reveal className="text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[3px] text-gold-dark">
          <i className="fas fa-heart text-gold animate-float" />
          Moments of worship
          <i className="fas fa-heart text-gold animate-float" />
        </p>
        <h2 className="font-serif text-[clamp(1.7rem,3.8vw,2.5rem)] font-bold text-navy">
          Our Community in <span className="text-gradient-gold">Pictures</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          A glimpse of the joy, fellowship, and worship that fill our church family.
        </p>
        {configured && fbPhotos.length > 0 && (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
            <i className="fab fa-facebook text-[#1877F2]" />
            Fresh from our Facebook page
          </p>
        )}
      </Reveal>

      {/* Photos / Videos toggle — only shown when videos are available */}
      {hasVideos && (
        <Reveal className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-line bg-white p-1 shadow-sm">
            {[
              { key: 'photos', label: 'Photos', icon: 'fa-images', count: items.length },
              { key: 'videos', label: 'Videos', icon: 'fa-play', count: videos.length },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  tab === t.key
                    ? 'bg-gold text-navy shadow-[0_6px_18px_rgba(201,162,75,0.35)]'
                    : 'text-muted hover:text-navy'
                }`}
              >
                <i className={`fas ${t.icon}`} />
                {t.label}
                <span
                  className={`rounded-full px-1.5 text-xs ${
                    tab === t.key ? 'bg-navy/10 text-navy' : 'bg-cream text-muted'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      )}

      {/* PHOTOS — grouped by date, each date its own category */}
      {tab === 'photos' && (
        <div className="mt-10 space-y-14">
          {photoGroups.map((group) => (
            <div key={group.key}>
              {group.label && (
                <Reveal className="mb-6 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm">
                    <i className="fas fa-calendar-day text-gold" />
                    {group.label}
                  </span>
                  <span className="text-sm font-medium text-muted">
                    {group.photos.length} {group.photos.length === 1 ? 'photo' : 'photos'}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </Reveal>
              )}

              <div className="grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[210px] lg:grid-cols-4">
                {group.photos.map((item, li) => (
                  <Reveal
                    key={item.full + item.index}
                    delay={(li % 4) * 70}
                    className={`group relative overflow-hidden rounded-2xl ${spanFor(li)}`}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(item.index)}
                      aria-label={`View photo: ${item.caption}`}
                      className="relative block h-full w-full"
                    >
                      <img
                        src={item.thumb}
                        alt={item.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-110"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <i className="fas fa-expand text-sm" />
                      </span>
                      <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="block font-serif text-[0.98rem] font-semibold text-white drop-shadow line-clamp-1">
                          {item.caption}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIDEOS — Facebook embeds */}
      {tab === 'videos' && hasVideos && (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 90}>
              <div className="card overflow-hidden p-2.5">
                <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
                  <iframe
                    title={v.title || `Facebook video ${i + 1}`}
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                      v.permalink,
                    )}&show_text=false&autoplay=false`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="px-2 py-3 text-center">
                  {v.title && (
                    <p className="font-serif text-[0.98rem] text-navy line-clamp-2">{v.title}</p>
                  )}
                  {v.date && (
                    <p className="mt-1 text-xs font-medium text-gold-dark">
                      <i className="fas fa-calendar-day mr-1" />
                      {fmtDate(v.date)}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Lightbox (photos only) */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-md animate-rise"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-5 top-5 z-[2] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-gold hover:text-navy"
            aria-label="Close"
            onClick={close}
          >
            <i className="fas fa-xmark" />
          </button>
          <button
            className="absolute left-4 top-1/2 z-[2] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-gold hover:text-navy sm:left-8"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            className="absolute right-4 top-1/2 z-[2] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-gold hover:text-navy sm:right-8"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            <i className="fas fa-chevron-right" />
          </button>
          <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].full}
              alt={items[active].caption}
              className="max-h-[80vh] max-w-[92vw] rounded-xl bg-white object-contain p-1.5 shadow-2xl"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
              <span className="font-serif italic">{items[active].caption}</span>
              {items[active].date && (
                <>
                  <span className="text-white/40">·</span>
                  <span className="text-gold/90">{fmtDate(items[active].date)}</span>
                </>
              )}
              <span className="text-white/40">·</span>
              <span className="tabular-nums text-white/60">
                {active + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
