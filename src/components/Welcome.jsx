import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

export default function Welcome() {
  return (
    <section className="container-wide grid items-center gap-12 py-[clamp(48px,7vw,90px)] lg:grid-cols-2">
      {/* Image collage */}
      <Reveal className="relative">
        <div className="relative">
          <img
            src="/image/photo5.jpg"
            alt="Worship at Ethiopian Emmanuel Evangelical Church"
            loading="lazy"
            className="w-full rounded-2xl object-cover shadow-[0_24px_60px_rgba(20,35,59,0.22)] aspect-[4/5]"
          />
          <img
            src="/image/photo6.jpg"
            alt="Church fellowship"
            loading="lazy"
            className="absolute -bottom-8 -right-4 w-2/5 rounded-2xl border-4 border-white object-cover shadow-[0_18px_40px_rgba(20,35,59,0.25)] aspect-square animate-float hidden sm:block"
          />
          <span className="absolute -left-4 top-8 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy shadow-lg">
            <i className="fas fa-cross mr-2" />
            Christ-centered
          </span>
        </div>
      </Reveal>

      {/* Text */}
      <Reveal delay={120}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-gold-dark">
          <span lang="am">እንኳን ደህና መጡ</span> · Welcome home
        </p>
        <h2 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-tight text-navy">
          A place to belong, believe, and{' '}
          <span className="text-gradient-gold">become</span>
        </h2>
        <p className="mt-5 text-[1.05rem] leading-[1.9] text-muted">
          Ethiopian Emmanuel Evangelical Church is a Christ-centered family in Austin,
          Texas, proclaiming the Gospel of Jesus Christ and the transforming work of
          the Holy Spirit. Whether you are exploring faith for the first time or
          looking for a church home, there is a place for you here.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { num: '2+', label: 'Years serving' },
            { num: '2', label: 'Languages' },
            { num: '100%', label: 'Welcome' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-white px-3 py-4 text-center shadow-sm">
              <div className="font-serif text-2xl font-bold text-gold-dark">{s.num}</div>
              <div className="mt-1 text-xs font-medium text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/about" className="btn btn-gold">
            Our Story
          </Link>
          <Link
            to="/services"
            className="btn border border-navy/20 bg-white text-navy hover:bg-navy hover:text-white"
          >
            Plan a Visit
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
