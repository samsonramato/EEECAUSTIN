export default function ServiceCard({ icon, title, desc }) {
  return (
    <div className="card flex flex-col items-center px-7 py-10 text-center">
      <span className="icon-badge mb-5">
        <i className={`fas ${icon}`} />
      </span>
      <h2 className="mb-2.5 font-serif text-xl font-bold text-navy">{title}</h2>
      <p className="text-[0.96rem] text-muted">{desc}</p>
    </div>
  )
}
