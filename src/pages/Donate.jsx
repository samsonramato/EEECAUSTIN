import { useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import VisitCTA from '../components/VisitCTA.jsx'
import { giving } from '../data/site.js'

export default function Donate() {
  useEffect(() => {
    document.title =
      'Give — Ethiopian Emmanuel Evangelical Church Austin | Gospel & Evangelical Community'
  }, [])

  return (
    <>
      <PageHero eyebrow="Partner with us" title="Give & Support" />

      {/* Intro + verse */}
      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="icon-badge mb-5">
            <i className="fas fa-hand-holding-heart" />
          </span>
          <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold text-navy">
            A Cheerful <span className="text-gradient-gold">Giver</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-[1.9] text-muted">{giving.intro}</p>
        </Reveal>

        {/* Giving methods */}
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {giving.methods.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 110}>
              <div className="card flex h-full flex-col items-center px-7 py-10 text-center">
                <span className="icon-badge mb-5">
                  <i className={`fas ${m.icon}`} />
                </span>
                <h3 className="mb-2.5 font-serif text-xl font-bold text-navy">{m.title}</h3>
                <p className="text-[0.96rem] text-muted">{m.desc}</p>
                <p className="mt-4 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-navy ring-1 ring-line">
                  {m.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Scripture banner */}
      <section className="bg-soft-pattern">
        <Reveal className="container-wide py-[clamp(44px,6vw,72px)]">
          <figure className="mx-auto max-w-3xl text-center">
            <i className="fas fa-quote-left mb-4 text-3xl text-gold/60" />
            <blockquote className="font-serif text-[clamp(1.2rem,2.5vw,1.7rem)] font-medium italic leading-relaxed text-navy">
              “{giving.verse.text}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[2px] text-gold-dark">
              {giving.verse.ref}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <VisitCTA />
    </>
  )
}
