import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroImages } from '../data/site.js'

const transitions = [
  't-fade', 't-zoom-in', 't-zoom-out', 't-blur-in', 't-rotate',
  't-skew', 't-fade-scale', 't-wipe-left', 't-wipe-right', 't-fade-blur', 't-bounce',
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [anim, setAnim] = useState('t-fade')
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length)
      setAnim(transitions[Math.floor(Math.random() * transitions.length)])
    }, 5000)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section className="relative flex items-center justify-center w-full overflow-hidden min-h-[560px] h-[92vh]">
      {/* Background layer (transitions applied here, not the text) */}
      <div
        key={index}
        className={`absolute -inset-[2%] bg-cover bg-center ${anim}`}
        style={{ backgroundImage: `url(${heroImages[index]})` }}
        aria-hidden="true"
      />
      {/* Darkening gradient */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-navy/45 via-navy/55 to-navy/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-[3] max-w-[820px] px-6 text-center text-white animate-rise">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-gold">
          <span lang="am">እንኳን ደህና መጡ</span> • Welcome
        </p>
        <h1 className="font-serif font-extrabold leading-[1.1] tracking-wide text-[clamp(2.2rem,5.5vw,4rem)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          Ethiopian Emmanuel <br className="hidden sm:block" /> Evangelical Church
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[clamp(1rem,2vw,1.2rem)] text-white/90">
          A Gospel-centered community in Austin, Texas — worship, fellowship, and
          faith for all who seek God.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/services" className="btn btn-gold">
            Our Services
          </Link>
          <Link to="/about" className="btn btn-outline">
            Learn More
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#welcome"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-[3] -translate-x-1/2 text-white/80 hover:text-gold"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/60 p-1.5">
          <span className="block h-2 w-1 rounded-full bg-white animate-scroll-hint" />
        </span>
      </a>
    </section>
  )
}
