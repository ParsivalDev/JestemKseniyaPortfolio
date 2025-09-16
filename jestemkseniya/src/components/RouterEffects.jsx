'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function RouterEffects() {
  const pathname = usePathname()
  const firstRef = useRef(true)

  useEffect(() => {
    if (firstRef.current) { firstRef.current = false; return }
    const root = document.getElementById('page-root')
    if (!root) return
    // trigger after layout paint to ensure smoother start
    requestAnimationFrame(() => {
      root.classList.add('rt-animate')
    })
    const t = setTimeout(() => root.classList.remove('rt-animate'), 650)
    return () => { clearTimeout(t) }
  }, [pathname])

  return null
}
