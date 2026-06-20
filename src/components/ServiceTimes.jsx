import Reveal from './Reveal.jsx'
import { serviceTimes } from '../data/site.js'

export default function ServiceTimes() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" aria-hidden="true" />
      {/* soft gold glow */}
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-wide relative py-[clamp(44px,6vw,72px)]">
        <Reveal className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-gold">
            <span lang="am">የአገልግሎት ሰዓታት</span> · Join us this week
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3.4vw,2.3rem)] font-bold text-white">
            Service <span className="text-gradient-gold">Times</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceTimes.map((s, i) => (
            <Reveal key={s.name} delay={i * 110}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/10">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xl text-gold ring-1 ring-gold/30 transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                  <i className={`fas ${s.icon}`} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-gold/80">{s.day}</p>
                  <h3 className="font-serif text-lg font-bold text-white">{s.name}</h3>
                  <p className="mt-0.5 text-sm text-white/75">{s.time}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
