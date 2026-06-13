import { useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { services } from '../data/site.js'

export default function Services() {
  useEffect(() => {
    document.title =
      'Worship Services — Ethiopian Emmanuel Evangelical Church Austin | Gospel Community'
  }, [])

  return (
    <>
      <PageHero eyebrow="What we offer" title="Worship & Ministries" />

      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <SectionHeading eyebrow="Serving our community" title="Our Services" />
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>
    </>
  )
}
