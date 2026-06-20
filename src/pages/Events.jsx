import { useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import VisitCTA from '../components/VisitCTA.jsx'
import { events } from '../data/site.js'

export default function Events() {
  useEffect(() => {
    document.title =
      'Events — Ethiopian Emmanuel Evangelical Church Austin | Gospel & Evangelical Community'
  }, [])

  return (
    <>
      <PageHero eyebrow="Gather with us" title="Events & Gatherings" />

      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <Reveal>
          <SectionHeading eyebrow="What’s happening" title="Upcoming Events" />
        </Reveal>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* vertical line */}
          <span
            className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {events.map((ev, i) => (
              <Reveal key={ev.title} delay={(i % 3) * 90}>
                <div
                  className={`relative flex items-start gap-5 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* node */}
                  <span className="relative z-[2] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-xl text-navy shadow-[0_8px_22px_rgba(201,162,75,0.4)] md:absolute md:left-1/2 md:-translate-x-1/2">
                    <i className={`fas ${ev.icon}`} />
                  </span>

                  {/* card */}
                  <div className={`card flex-1 p-6 md:w-[calc(50%-2.5rem)] md:flex-none ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      {ev.recurring && (
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-gold-dark">
                          Weekly
                        </span>
                      )}
                      <span className="text-xs font-semibold uppercase tracking-[2px] text-muted">
                        {ev.date} · {ev.time}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-bold text-navy">{ev.title}</h3>
                    <p className="text-sm text-gold-dark" lang="am">{ev.am}</p>
                    <p className="mt-2 text-[0.96rem] leading-relaxed text-muted">{ev.desc}</p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                      <i className="fas fa-location-dot text-gold" />
                      {ev.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 text-center">
          <p className="text-muted">
            Follow us on Facebook for special services, holidays, and community events.
          </p>
        </Reveal>
      </section>

      <VisitCTA />
    </>
  )
}
