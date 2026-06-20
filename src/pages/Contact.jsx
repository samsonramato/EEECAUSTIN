import { useEffect, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceTimes from '../components/ServiceTimes.jsx'
import { contact } from '../data/site.js'

const cards = [
  {
    icon: 'fa-location-dot',
    title: 'Visit Us',
    lines: [contact.address],
  },
  {
    icon: 'fa-phone',
    title: 'Call Us',
    lines: contact.phones,
    hrefs: contact.phones.map((p) => `tel:${p.replace(/\s/g, '')}`),
  },
  {
    icon: 'fa-envelope',
    title: 'Email Us',
    lines: [contact.email],
    hrefs: [`mailto:${contact.email}`],
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.title =
      'Contact — Ethiopian Emmanuel Evangelical Church Austin | Gospel & Evangelical Community'
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Website message from ${data.get('name') || 'a visitor'}`)
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\n${data.get('message')}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const fieldClass =
    'w-full rounded-xl border border-line bg-cream/40 px-4 py-3 text-ink outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/30'

  return (
    <>
      <PageHero eyebrow="We’d love to hear from you" title="Get in Touch" />

      {/* Contact cards */}
      <div className="container-wide -mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 120} className="card relative z-[5] flex flex-col items-center px-6 py-9 text-center">
            <span className="icon-badge mb-4">
              <i className={`fas ${c.icon}`} />
            </span>
            <h3 className="mb-2 font-serif text-xl font-bold text-navy">{c.title}</h3>
            {c.lines.map((line, j) => (
              <p key={line} className="text-[0.96rem] text-muted">
                {c.hrefs ? (
                  <a href={c.hrefs[j]} className="transition hover:text-gold-dark">
                    {line}
                  </a>
                ) : (
                  line
                )}
              </p>
            ))}
          </Reveal>
        ))}
      </div>

      {/* Form + map */}
      <section className="bg-soft-pattern">
        <div className="container-wide grid items-start gap-10 py-[clamp(48px,7vw,84px)] lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Send a message" title="Reach Our Team" center={false} />
            <p className="mt-4 max-w-md text-muted">
              Have a prayer request, question, or want to plan your first visit? Fill out
              the form and we’ll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Your name" className={fieldClass} />
                <input name="email" type="email" required placeholder="Email address" className={fieldClass} />
              </div>
              <input name="phone" placeholder="Phone (optional)" className={fieldClass} />
              <textarea
                name="message"
                required
                rows={5}
                placeholder="How can we pray for you or help?"
                className={fieldClass}
              />
              <button type="submit" className="btn btn-gold w-full sm:w-auto">
                <i className="fas fa-paper-plane" />
                Send Message
              </button>
              {sent && (
                <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
                  <i className="fas fa-circle-check" />
                  Your email app should open with the message ready to send.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={140}>
            <div className="card overflow-hidden p-2.5">
              <iframe
                title="Church location map"
                src={contact.mapEmbed}
                className="h-[460px] w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-dark hover:underline"
            >
              <i className="fab fa-facebook text-[#1877F2]" />
              Message us on Facebook
            </a>
          </Reveal>
        </div>
      </section>

      <ServiceTimes />
    </>
  )
}
