'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { sections } from './sections'
import { Menu, X } from 'lucide-react'

export default function AppNav({ embedded = false }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  useEffect(() => { close() }, [pathname, close])
  useEffect(() => {
    const el = document.documentElement
    if (open) { el.style.overflow = 'hidden' } else { el.style.overflow = '' }
    return () => { el.style.overflow = '' }
  }, [open])

  return (
    <header className={`app-nav ${embedded ? 'in-section' : ''}`}>
      <div className="app-nav-inner">
        {/* Desktop nav */}
        <nav className="app-links" aria-label="Nawigacja serwisu">
          {sections.map(({ id, href, short }) => (
            <Link key={id} href={href} className={`app-link ${href === pathname ? 'is-active' : ''}`}>{short || id}</Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button type="button" className="app-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Drawer */}
      <div className={`app-drawer ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-head">
          <span className="app-brand">Menu</span>
          <button type="button" className="drawer-close" onClick={close} aria-label="Zamknij"><X className="w-6 h-6"/></button>
        </div>
        <div className="drawer-links">
          {sections.map(({ id, href, label }) => (
            <Link key={id} href={href} className={`drawer-link ${href === pathname ? 'is-active' : ''}`}>{label}</Link>
          ))}
        </div>
      </div>
      <div className={`app-dim ${open ? 'show' : ''}`} onClick={close} />
    </header>
  )
}
