import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { galleryImages } from '../data/site.js'

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="container-wide py-[clamp(48px,7vw,84px)]">
      <Reveal>
        <SectionHeading eyebrow="Moments of worship" title="Our Community in Pictures" />
      </Reveal>

      {/* Masonry via CSS columns */}
      <div className="mt-12 [column-fill:_balance] columns-2 gap-4 sm:columns-3 lg:columns-4">
        {galleryImages.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 80} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(src)}
              className="group relative block w-full overflow-hidden rounded-xl shadow-md ring-1 ring-line transition-shadow hover:shadow-xl"
            >
              <img
                src={src}
                alt={`Church gallery photo ${i + 1}`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <i className="fas fa-expand text-sm" />
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
            className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
