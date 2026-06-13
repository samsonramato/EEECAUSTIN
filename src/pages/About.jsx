import { useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import { aboutMission } from '../data/site.js'

export default function About() {
  useEffect(() => {
    document.title =
      'About — Ethiopian Emmanuel Evangelical Church Austin | Gospel & Evangelical Community'
  }, [])

  return (
    <>
      <PageHero eyebrow="Get to know us" title="About Our Church" />

      <div className="container-wide -mt-14 grid grid-cols-1 gap-7 pb-[clamp(40px,6vw,70px)] md:grid-cols-2 lg:grid-cols-3">
        <section className="card relative z-[5] p-[clamp(24px,3vw,34px)]">
          <h2 className="relative mb-4 pb-3 font-serif text-2xl text-navy after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:rounded after:bg-gold">
            About Us
          </h2>
          <p className="mb-3.5 text-muted">
            <span className="font-serif font-bold text-navy">
              Ethiopian Emmanuel Evangelical Church in Austin, Texas,
            </span>{' '}
            is a Christ-centered community dedicated to glorifying God through worship,
            discipleship, and service. Our mission is to proclaim the Gospel of Jesus
            Christ, nurture spiritual growth, and build a strong fellowship among believers.
          </p>
          <p className="text-muted">
            Since our inception, we have strived to serve the Ethiopian and broader
            community in Austin and beyond, sharing the love of Christ and fostering a
            spirit of unity and compassion — a place where individuals and families can
            grow in faith, engage in meaningful ministry, and develop lasting relationships
            rooted in Christ.
          </p>
        </section>

        <section className="card relative z-[5] p-[clamp(24px,3vw,34px)]">
          <h2 className="relative mb-4 pb-3 font-serif text-2xl text-navy after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:rounded after:bg-gold">
            Our Vision
          </h2>
          <p className="text-muted">
            To be a beacon of hope and transformation in our community by sharing the
            Gospel and living out the teachings of Christ in every aspect of our lives.
          </p>
        </section>

        <section className="card relative z-[5] p-[clamp(24px,3vw,34px)]">
          <h2 className="relative mb-4 pb-3 font-serif text-2xl text-navy after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:rounded after:bg-gold">
            Our Mission
          </h2>
          <ul className="space-y-3">
            {aboutMission.map((item) => (
              <li key={item} className="relative pl-7 text-muted">
                <i className="fas fa-check absolute left-0 top-1 text-sm text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
