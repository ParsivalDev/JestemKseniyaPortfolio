// =========================
// FILE: src/components/Section.jsx
// =========================
'use client'
import AppNav from './AppNav'

export default function Section({ id, children }) {
  return (
    <section id={id} className="relative w-full min-h-dvh flex items-center justify-center p-6 md:p-10 lg:p-14 pad-safe">
      {/* Wrapper to position menu exactly 5px above the card, aligned to its right edge */}
      <div className="relative w-full max-w-6xl">
        <div className="mb-5">
          <AppNav embedded />
        </div>
        <div className="glass-strong section-card rounded-3xl w-full px-5 sm:px-6 py-12 sm:py-14 relative overflow-hidden">
          <div className="section-orbs" aria-hidden></div>
          {children}
          {/* section-level nav removed in favor of global AppNav */}
        </div>
      </div>
      {/* old dot navigation removed; scroll hint removed */}
    </section>
  )
}
