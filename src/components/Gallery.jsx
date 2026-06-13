import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import { galleryImages } from '../data/site.js'

// Gentle, repeating tilt pattern so the wall feels playful but tidy
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-1']
const captions = [
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

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
      </Reveal>

      {/* Polaroid masonry wall */}
      <div className="mt-12 [column-fill:_balance] columns-2 gap-5 sm:columns-3 lg:columns-4">
        {galleryImages.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 80} className="mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(src)}
              className={`group block w-full rounded-[14px] bg-white p-2.5 pb-9 shadow-[0_10px_30px_rgba(20,35,59,0.12)] ring-1 ring-line transition-all duration-300 hover:z-10 hover:rotate-0 hover:shadow-[0_22px_50px_rgba(20,35,59,0.22)] ${tilts[i % tilts.length]}`}
            >
              <span className="relative block overflow-hidden rounded-[8px]">
                <img
                  src={src}
                  alt={captions[i % captions.length]}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* heart pop */}
                <span className="absolute right-2.5 top-2.5 flex h-9 w-9 scale-0 items-center justify-center rounded-full bg-white/90 text-rose-400 shadow transition-transform duration-300 group-hover:scale-100">
                  <i className="fas fa-heart" />
                </span>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
              {/* handwritten-style caption */}
              <span className="mt-2.5 block text-center font-serif text-[0.95rem] italic text-navy/70">
                {captions[i % captions.length]}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm animate-rise"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-gold hover:text-navy"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <i className="fas fa-xmark" />
          </button>
          <img
            src={active}
            alt="Enlarged church photo"
            className="max-h-[88vh] max-w-[92vw] rounded-xl bg-white p-2 object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
