// =========================
// FILE: src/components/Section.jsx
// =========================
'use client'
import NavDots from './NavDots'

export default function Section({ id, children }) {
  return (
    <section id={id} className="relative min-h-dvh flex items-center justify-center p-6">
      <div className="glass-strong rounded-3xl w-full max-w-6xl px-6 py-12">
        {children}
      </div>
      <NavDots currentId={id} />
    </section>
  )
}
