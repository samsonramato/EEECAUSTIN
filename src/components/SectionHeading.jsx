export default function SectionHeading({ eyebrow, title, center = true }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-gold-dark">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif font-bold text-navy text-[clamp(1.6rem,3.8vw,2.4rem)] relative inline-block pb-4 ${
          center
            ? "after:left-1/2 after:-translate-x-1/2"
            : "after:left-0"
        } after:absolute after:bottom-0 after:w-[70px] after:h-[3px] after:bg-gold after:rounded`}
      >
        {title}
      </h2>
    </div>
  )
}
