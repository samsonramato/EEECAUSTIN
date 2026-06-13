import Reveal from './Reveal.jsx'
import { values } from '../data/site.js'

export default function Values() {
  return (
    <section className="bg-navy bg-soft-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-light opacity-95" />
      <div className="container-wide relative py-[clamp(48px,7vw,84px)]">
        <Reveal className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-gold">
            What we stand for
          </p>
          <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold text-white">
            Rooted in Faith, Growing in <span className="text-gradient-gold">Grace</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/10">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold ring-1 ring-gold/30 transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                  <i className={`fas ${v.icon}`} />
                </span>
                <h3 className="font-serif text-xl font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
