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

// Repeating mosaic rhythm: a couple of larger "feature" tiles among the rest.
// grid-flow-dense fills any gaps so it stays tidy for any photo count.
const spanFor = (i) => {
  const m = i % 6
  if (m === 0) return 'sm:col-span-2 sm:row-span-2'
  if (m === 4) return 'lg:row-span-2'
  return ''
}

export default function Gallery() {
  const [active, setActive] = useState(null) // index into items, or null
  const { photos: fbPhotos, configured } = useFacebookMedia()

  // Prefer live Facebook photos; otherwise show local images.
  const items =
    fbPhotos.length > 0
      ? fbPhotos.map((p, i) => ({
          full: p.src,
          thumb: p.thumb || p.src,
          caption: p.caption || localCaptions[i % localCaptions.length],
        }))
      : galleryImages.map((src, i) => ({
          full: src,
          thumb: src,
          caption: localCaptions[i % localCaptions.length],
        }))

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

      {/* Editorial mosaic */}
      <div className="mt-12 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[210px] lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.full + i}
            delay={(i % 4) * 70}
            className={`group relative overflow-hidden rounded-2xl ${spanFor(i)}`}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo: ${item.caption}`}
              className="relative block h-full w-full"
            >
              <img
                src={item.thumb}
                alt={item.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-110"
              />
              {/* ring + gradient */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* expand pill */}
              <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <i className="fas fa-expand text-sm" />
              </span>

              {/* caption */}
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-serif text-[0.98rem] font-semibold text-white drop-shadow line-clamp-1">
                  {item.caption}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-md animate-rise"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* close */}
          <button
            className="absolute right-5 top-5 z-[2] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-gold hover:text-navy"
            aria-label="Close"
            onClick={close}
          >
            <i className="fas fa-xmark" />
          </button>

          {/* prev */}
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

          {/* next */}
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

          {/* image + caption */}
          <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].full}
              alt={items[active].caption}
              className="max-h-[80vh] max-w-[92vw] rounded-xl bg-white object-contain p-1.5 shadow-2xl"
            />
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-white/80">
              <span className="font-serif italic">{items[active].caption}</span>
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
