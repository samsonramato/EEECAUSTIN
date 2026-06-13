import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import Welcome from '../components/Welcome.jsx'
import Values from '../components/Values.jsx'
import Gallery from '../components/Gallery.jsx'
import FacebookVideos from '../components/FacebookVideos.jsx'
import VisitCTA from '../components/VisitCTA.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MinistryCard from '../components/MinistryCard.jsx'
import { ministries, faithAmharic, faithEnglish } from '../data/site.js'

const sermonsPlaylist =
  'https://www.youtube.com/embed/videoseries?list=PL8KjhzsBXNmBLJYpihUjrzvkMvov_tvTT&modestbranding=1&rel=0'

export default function Home() {
  useEffect(() => {
    document.title =
      'Ethiopian Emmanuel Evangelical Church — Austin, Texas | Gospel & Evangelical Community'
  }, [])

  return (
    <>
      <Hero />

      <div id="welcome">
        <Welcome />
      </div>

      <Values />

      {/* Statement of Faith */}
      <section className="bg-soft-pattern">
        <div className="container-wide py-[clamp(48px,7vw,84px)]">
          <Reveal>
            <SectionHeading eyebrow="የእምነት መግለጫ" title="Statement of Faith" />
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            <Reveal>
              <article className="card h-full relative overflow-hidden p-[clamp(26px,4vw,40px)] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-gradient-to-b before:from-gold before:to-gold-dark">
                <p className="text-[1.02rem] leading-[1.9] text-muted" lang="am">
                  {faithAmharic}
                </p>
                <a href="#" className="mt-4 inline-block font-semibold text-gold-dark hover:underline" lang="am">
                  የእምነት መግለጫን በዝርዝር ይመልከቱ.....
                </a>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="card h-full relative overflow-hidden p-[clamp(26px,4vw,40px)] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-gradient-to-b before:from-gold before:to-gold-dark">
                <p className="text-[1.02rem] leading-[1.9] text-muted">
                  <span className="font-serif font-bold text-navy">
                    Ethiopian Emmanuel Evangelical Church in Austin, Texas,
                  </span>{' '}
                  {faithEnglish}
                </p>
                <a href="#" className="mt-4 inline-block font-semibold text-gold-dark hover:underline">
                  We invite you to explore our “Statement of Faith”
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ministries / quick links */}
      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <Reveal>
          <SectionHeading eyebrow="Get involved" title="Our Ministries" />
        </Reveal>
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((m, i) => (
            <Reveal key={m.en} delay={(i % 4) * 90}>
              <MinistryCard {...m} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <div className="bg-soft-pattern">
        <Gallery />
      </div>

      {/* Media */}
      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <Reveal>
          <SectionHeading eyebrow="Watch & listen" title="Sermons & Worship" />
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="card p-[clamp(20px,3vw,32px)] text-center">
              <h3 className="mb-5 font-serif text-2xl font-bold text-navy">
                Sermons — <span lang="am">ስብከቶች</span>
              </h3>
              <iframe
                title="Sermons playlist"
                src={sermonsPlaylist}
                className="aspect-video w-full rounded-lg border-0 shadow-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card p-[clamp(20px,3vw,32px)] text-center">
              <h3 className="mb-5 font-serif text-2xl font-bold text-navy">
                Worship — <span lang="am">የአምልኮ ጊዜ</span>
              </h3>
              <iframe
                title="Worship playlist"
                src={sermonsPlaylist}
                className="aspect-video w-full rounded-lg border-0 shadow-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FacebookVideos />

      <VisitCTA />
    </>
  )
}
