import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { contact } from '../data/site.js'

export default function VisitCTA() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/image/hero-bg.jpg)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/75" aria-hidden="true" />

      <Reveal className="container-wide relative py-[clamp(56px,8vw,100px)] text-center text-white">
        <i className="fas fa-hands-praying mb-5 text-4xl text-gold animate-float" />
        <h2 className="mx-auto max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight">
          We’d love to worship with you this Sunday
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
          Come as you are. Join our Gospel-centered family for worship, fellowship,
          and the Word of God.
        </p>
        <p className="mt-3 flex items-center justify-center gap-2 text-white/75">
          <i className="fas fa-location-dot text-gold" />
          {contact.address}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/services" className="btn btn-gold">
            View Services
          </Link>
          <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`} className="btn btn-outline">
            <i className="fas fa-phone" />
            Call Us
          </a>
        </div>
      </Reveal>
    </section>
  )
}
