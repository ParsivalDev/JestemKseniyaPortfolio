'use client'
import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { sections } from '@/components/sections'

export default function ScrollRouteNav() {
  const router = useRouter()
  const pathname = usePathname() || '/'
  const coolingRef = useRef(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  useEffect(() => {
    const order = sections.map(s => s.href)
    const idx = Math.max(0, order.indexOf(pathname))

    const cooldown = (ms = 900) => { coolingRef.current = true; setTimeout(() => { coolingRef.current = false }, ms) }

    const go = (dir) => {
      if (coolingRef.current) return
      const next = dir === 1 ? idx + 1 : idx - 1
      if (next < 0 || next >= order.length) return
      coolingRef.current = true
      router.push(order[next])
      cooldown()
    }

    const onWheel = (e) => {
      if (coolingRef.current) return
      // ignore if user is over a scrollable element that can scroll further
      const t = e.target
      if (t && t.closest) {
        const scroller = t.closest('[data-scrollable="true"], .no-route-scroll')
        if (scroller) return
      }
      const dy = e.deltaY || 0
      if (Math.abs(dy) < 8) return
      // Prevent page scroll jump if we will navigate
      e.preventDefault?.()
      go(dy > 0 ? 1 : -1)
    }

    const onTouchStart = (e) => {
      const t = e.touches[0]
      touchStartY.current = t.clientY
      touchStartX.current = t.clientX
    }
    const onTouchEnd = (e) => {
      if (coolingRef.current) return
      const t = e.changedTouches[0]
      const dy = t.clientY - touchStartY.current
      const dx = t.clientX - touchStartX.current
      if (Math.abs(dy) < 40 || Math.abs(dy) <= Math.abs(dx)) return
      go(dy < 0 ? 1 : -1)
    }

    // Only enable on our main section pages
    const enabled = order.includes(pathname)
    if (!enabled) return

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [pathname, router])

  return null
}
