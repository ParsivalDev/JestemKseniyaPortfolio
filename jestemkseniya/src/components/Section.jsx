// =========================
// FILE: src/components/Section.jsx
// =========================
'use client'
import SectionNav from './SectionNav'
import ScrollHint from './ScrollHint'

export default function Section({ id, children }) {
  return (
    <section id={id} className="relative w-full flex items-center justify-center p-6 md:p-10 lg:p-14 pad-safe">
      <div className="glass-strong section-card rounded-3xl w-full max-w-6xl px-5 sm:px-6 py-12 sm:py-14 relative overflow-hidden">
        <div className="section-orbs" aria-hidden></div>
        {children}
        {/* Nav always at the bottom of the section */}
        <div className="mt-8 relative z-20">
          <SectionNav currentId={id} />
        </div>
      </div>
      {/* Subtle scroll hint placed under the glass card */}
      <ScrollHint id={id} />
      {/* old dot navigation removed */}
    </section>
  )
}
