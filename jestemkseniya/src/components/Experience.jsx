// =========================
// FILE: src/components/Experience.jsx
// =========================
import { Plane, Globe, Wrench } from 'lucide-react'

export default function Experience() {
  const Chip = ({ children, color = 'chip-blue' }) => (
    <span className={`chip ${color}`}>{children}</span>
  )

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
      <div className="header-card max-w-3xl text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-2 text-gradient">Doświadczenie i umiejętności</h2>
        <p className="opacity-70 text-sm md:text-base">Wybrani partnerzy, języki i narzędzia, z którymi pracuję</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
        {/* Trusted by */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="icon-bubble"><Plane className="w-5 h-5" /></div>
            <h3 className="font-semibold">Zaufali mi</h3>
          </div>
          <p className="opacity-80 text-sm">Zaufali mi m.in.:</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm">
            {['Emirates','Qatar Airways','Fly Dubai','…and more'].map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black/30" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="icon-bubble"><Globe className="w-5 h-5" /></div>
            <h3 className="font-semibold">Języki</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip color="chip-purple">Angielski</Chip>
            <Chip color="chip-green">Polski</Chip>
            <Chip color="chip-pink">Rosyjski</Chip>
          </div>
        </div>

        {/* Software */}
        <div className="stat-card md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="icon-bubble"><Wrench className="w-5 h-5" /></div>
            <h3 className="font-semibold">Oprogramowanie</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['CapCut','chip-green'],
              ['Premiere Pro','chip-purple'],
              ['Photoshop','chip-blue'],
              ['Meta Ads','chip-pink'],
              ['Google Ads','chip-blue'],
              ['Strony low‑code','chip-purple']
            ].map(([t, c]) => (
              <Chip key={t} color={c}>{t}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
