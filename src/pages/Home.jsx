import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
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

      {/* Statement of Faith */}
      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <SectionHeading eyebrow="የእምነት መግለጫ" title="Statement of Faith" />

        <div className="mt-12 grid gap-7 md:grid-cols-2">
          <article className="card relative overflow-hidden p-[clamp(26px,4vw,40px)] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-gradient-to-b before:from-gold before:to-gold-dark">
            <p className="text-[1.02rem] leading-[1.9] text-muted" lang="am">
              {faithAmharic}
            </p>
            <a href="#" className="mt-4 inline-block font-semibold text-gold-dark hover:underline" lang="am">
              የእምነት መግለጫን በዝርዝር ይመልከቱ.....
            </a>
          </article>

          <article className="card relative overflow-hidden p-[clamp(26px,4vw,40px)] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-gradient-to-b before:from-gold before:to-gold-dark">
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
        </div>
      </section>

      {/* Ministries / quick links */}
      <section className="container-wide pb-[clamp(40px,6vw,70px)]">
        <SectionHeading eyebrow="Get involved" title="Our Ministries" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((m) => (
            <MinistryCard key={m.en} {...m} />
          ))}
        </div>
      </section>

      {/* Media */}
      <section className="container-wide pb-[clamp(48px,7vw,84px)]">
        <SectionHeading eyebrow="Watch & listen" title="Sermons & Worship" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
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
        </div>
      </section>
    </>
  )
}
