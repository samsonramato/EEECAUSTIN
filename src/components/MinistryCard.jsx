export default function MinistryCard({ icon, am, en, desc }) {
  return (
    <div className="card flex flex-col items-center px-6 py-9 text-center">
      <span className="icon-badge mb-4">
        <i className={`fas ${icon}`} />
      </span>
      <h3 className="font-serif text-lg font-bold text-navy" lang="am">
        {am}
      </h3>
      <h3 className="mb-2.5 text-[0.95rem] font-semibold text-muted">{en}</h3>
      <p className="text-[0.92rem] text-muted" lang="am">
        {desc}
      </p>
    </div>
  )
}
