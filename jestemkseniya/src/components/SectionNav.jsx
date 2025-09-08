'use client'
import { useCallback } from 'react'
import { sections as items } from './sections'

export default function SectionNav({ currentId }) {
  const go = useCallback((target) => {
    window.dispatchEvent(new CustomEvent('goSection', { detail: target }))
  }, [])

  return (
    <nav aria-label="Section navigation" className="w-full flex items-center justify-center mb-6">
      {/* Desktop / tablet */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
        {items.filter(i => i.id !== currentId).map(({ id, label, color }) => (
          <button key={id} onClick={() => go(id)} className={`badge-pill ${color}`}>
            <span className="inline-block align-middle">▶</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      {/* Mobile: bigger, sticky bottom bar */}
      <div className="sm:hidden fixed left-0 right-0 bottom-4 mx-auto w-full max-w-md px-4">
        <div className="glass flex items-center justify-center gap-2 rounded-full p-2">
          {items.filter(i => i.id !== currentId).map(({ id, label, color }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex-1 badge-pill ${color}`}
              style={{ height: 44 }}
              aria-label={label}
            >
              <span className="inline-block align-middle">▶</span>
              <span className="ml-1 text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
