// =========================
// FILE: src/components/Section.jsx
// =========================
'use client'
import SectionNav from './SectionNav'

export default function Section({ id, children }) {
  return (
    <section id={id} className="relative min-h-dvh flex items-center justify-center p-6">
      <div className="glass-strong rounded-3xl w-full max-w-6xl px-5 sm:px-6 py-10 sm:py-12 pb-28 sm:pb-12 relative overflow-hidden">
        <div className="section-orbs" aria-hidden></div>
        <SectionNav currentId={id} />
        {children}
      </div>
      {/* old dot navigation removed */}
    </section>
  )
}
