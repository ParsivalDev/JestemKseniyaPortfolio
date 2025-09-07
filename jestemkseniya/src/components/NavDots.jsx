// =========================
// FILE: src/components/NavDots.jsx
// =========================
'use client'
import { useCallback } from 'react'

const order = ['hero','portfolio','stats','social']

export default function NavDots({ currentId }) {
  const go = useCallback((target) => {
    const el = document.getElementById(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const idx = order.indexOf(currentId)
  const prev = order[Math.max(0, idx - 1)]
  const next = order[Math.min(order.length - 1, idx + 1)]

  return (
    <div className="fixed right-5 bottom-5 flex gap-3">
      <button aria-label="Poprzednia sekcja" className="dot" onClick={() => go(prev)}>↑</button>
      <button aria-label="Na górę" className="dot" onClick={() => go('hero')}>•</button>
      <button aria-label="Następna sekcja" className="dot" onClick={() => go(next)}>↓</button>
    </div>
  )
}