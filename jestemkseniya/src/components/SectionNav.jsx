'use client'
import { useCallback } from 'react'
import { sections as items } from './sections'
import { Play } from 'lucide-react'

export default function SectionNav({ currentId }) {
  const go = useCallback((target) => {
    window.dispatchEvent(new CustomEvent('goSection', { detail: target }))
  }, [])

  return (
    <nav aria-label="Section navigation" className="w-full flex items-center justify-center mb-6">
      {/* Desktop / tablet */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-3">
        {items.filter(i => i.id !== currentId).map(({ id, label, color }) => (
          <button type="button" key={id} onClick={() => go(id)} className={`badge-pill ${color} nav-pressable`}>
            <Play className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
      {/* Mobile: inline under content (no fixed) */}
      <div className="sm:hidden w-full">
        <div className="glass flex items-center gap-2 rounded-full p-2">
          {items.filter(i => i.id !== currentId).map(({ id, label, short, color }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex-1 badge-pill badge-compact ${color} nav-pressable`}
              style={{ height: 40, minWidth: 88 }}
              aria-label={label}
            >
              <Play className="w-4 h-4" />
              <span className="ml-1 text-xs font-medium">{short || label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
