'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const forwardDir = ['down', 'left', 'up']

function getDirection(from, to) {
  if (to === from) return 'none'
  const forward = to > from
  const step = forward ? from : to
  const dir = forwardDir[Math.min(step, forwardDir.length - 1)]
  if (!forward) {
    if (dir === 'down') return 'up'
    if (dir === 'up') return 'down'
    if (dir === 'left') return 'right'
  }
  return dir
}

export default function SectionStack({ ids, children }) {
  const panelsRef = useRef([])
  const animatingRef = useRef(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    panelsRef.current.forEach((el, i) => {
      if (!el) return
      Object.assign(el.style, {
        position: 'absolute', inset: '0',
        willChange: 'transform, opacity, filter',
        transition: 'none',
        pointerEvents: i === current ? 'auto' : 'none',
        visibility: i === current ? 'visible' : 'hidden',
        transform: 'translate3d(0,0,0)',
        opacity: '1',
        filter: 'none',
      })
    })
  }, [])

  const applyCurrent = useCallback((idx) => {
    panelsRef.current.forEach((el, i) => {
      if (!el) return
      Object.assign(el.style, {
        transition: 'none',
        transform: 'translate3d(0,0,0)',
        opacity: '1',
        visibility: i === idx ? 'visible' : 'hidden',
        pointerEvents: i === idx ? 'auto' : 'none',
        zIndex: i === idx ? '10' : '1',
      })
    })
  }, [])

  const goToIndex = useCallback((target) => {
    if (animatingRef.current) return
    if (target < 0 || target >= panelsRef.current.length) return
    const from = current
    const to = target
    if (to === from) return
    const dir = getDirection(from, to)
    const fromEl = panelsRef.current[from]
    const toEl = panelsRef.current[to]
    if (!fromEl || !toEl) return

    animatingRef.current = true
    Object.assign(fromEl.style, { zIndex: '10', transition: 'none', visibility: 'visible', pointerEvents: 'none' })
    Object.assign(toEl.style, { zIndex: '15', transition: 'none', visibility: 'visible', pointerEvents: 'none', opacity: '1' })

    const enterStart = {
      down: 'translate3d(0,100%,0) scale(1.06)',
      up: 'translate3d(0,-100%,0) scale(1.06)',
      left: 'translate3d(100%,0,0) scale(1.06)',
      right: 'translate3d(-100%,0,0) scale(1.06)'
    }[dir]

    const leaveEnd = {
      down: 'translate3d(0,-16%,0) scale(0.94)',
      up: 'translate3d(0,16%,0) scale(0.94)',
      left: 'translate3d(-16%,0,0) scale(0.94)',
      right: 'translate3d(16%,0,0) scale(0.94)'
    }[dir]

    Object.assign(toEl.style, { transform: enterStart, opacity: '1' })
    void toEl.offsetHeight
    requestAnimationFrame(() => {
      const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 430px)').matches
      const duration = isMobile ? 600 : 800
      const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'
      Object.assign(fromEl.style, { transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}` })
      Object.assign(toEl.style, { transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}` })

      // Fade the previous panel out completely to avoid seeing it under the new one
      Object.assign(fromEl.style, { transform: leaveEnd, opacity: '0' })
      Object.assign(toEl.style, { transform: 'translate3d(0,0,0)', opacity: '1' })

      // Hide the previous panel halfway through to prevent any residual flashes
      const hideTimer = setTimeout(() => {
        fromEl.style.visibility = 'hidden'
      }, Math.floor(duration * 0.5))

      const onDone = (ev) => {
        if (ev && (ev.target !== toEl || ev.propertyName !== 'transform')) return
        toEl.removeEventListener('transitionend', onDone)
        clearTimeout(hideTimer)
        Object.assign(fromEl.style, { opacity: '1', transform: 'translate3d(0,0,0)' })
        Object.assign(toEl.style,   { opacity: '1', transform: 'translate3d(0,0,0)' })
        setCurrent(to)
        applyCurrent(to)
        animatingRef.current = false
      }
      toEl.addEventListener('transitionend', onDone)
      setTimeout(() => { if (animatingRef.current) onDone() }, duration + 80)
    })
  }, [applyCurrent, current])

  useEffect(() => {
    const onGo = (e) => {
      const id = e.detail
      const idx = ids.indexOf(id)
      if (idx !== -1) goToIndex(idx)
    }
    window.addEventListener('goSection', onGo)
    return () => window.removeEventListener('goSection', onGo)
  }, [ids, goToIndex])

  useEffect(() => {
    const el = document
    let touchStartX = 0, touchStartY = 0
    const threshold = 24
    let lastTrigger = 0

    const onWheel = (e) => {
      const now = Date.now()
      if (animatingRef.current || now - lastTrigger < 700) { e.preventDefault(); return }
      const dy = e.deltaY || 0
      if (Math.abs(dy) < 4) { e.preventDefault(); return }
      if (dy > 0) goToIndex(Math.min(current + 1, ids.length - 1))
      else goToIndex(Math.max(0, current - 1))
      lastTrigger = now
      e.preventDefault()
    }
    const onTouchStart = (e) => {
      const t = e.touches[0]
      touchStartX = t.clientX
      touchStartY = t.clientY
    }
    const onTouchEnd = (e) => {
      if (animatingRef.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStartX
      const dy = t.clientY - touchStartY
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
      if (Math.abs(dy) >= Math.abs(dx)) {
        if (dy < 0) goToIndex(Math.min(current + 1, ids.length - 1))
        else goToIndex(Math.max(0, current - 1))
      } else {
        if (dx < 0) goToIndex(Math.min(current + 1, ids.length - 1))
        else goToIndex(Math.max(0, current - 1))
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false, capture: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel, { capture: true })
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [current, goToIndex, ids.length])

  useEffect(() => {
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev; document.body.style.overflow = '' }
  }, [])

  const tintClass = (id) => {
    switch (id) {
      case 'hero': return 'tint-hero'
      case 'portfolio': return 'tint-portfolio'
      case 'stats': return 'tint-stats'
      case 'experience': return 'tint-experience'
      default: return 'tint-hero'
    }
  }

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* persistent background under panels */}
      <div className="bg-stack" aria-hidden>
        <div className="bg-base" />
        <div className={`bg-tint ${tintClass(ids[current])}`} />
      </div>

      {Array.isArray(children) ? children.map((child, i) => (
        <div
          key={ids[i] || i}
          ref={el => panelsRef.current[i] = el}
          className="fp-panel"
          aria-hidden={i !== current}
        >
          {child}
        </div>
      )) : children}
    </div>
  )
}
