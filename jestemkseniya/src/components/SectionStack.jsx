'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const forwardDir = ['down', 'left', 'up'] // 0->1 down, 1->2 left, 2->3 up

function getDirection(from, to) {
  if (to === from) return 'none'
  const forward = to > from
  const step = forward ? from : to
  const dir = forwardDir[Math.min(step, forwardDir.length - 1)]
  if (!forward) {
    // invert
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

  // Initialize panel base styles
  useEffect(() => {
    panelsRef.current.forEach((el, i) => {
      if (!el) return
      Object.assign(el.style, {
        position: 'absolute', inset: '0',
        willChange: 'transform, opacity',
        transition: 'none',
        pointerEvents: i === current ? 'auto' : 'none',
        visibility: i === current ? 'visible' : 'hidden',
        transform: 'translate3d(0,0,0)',
        opacity: '1',
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
    // prep
    Object.assign(fromEl.style, { zIndex: '10', transition: 'none', visibility: 'visible', pointerEvents: 'none' })
    Object.assign(toEl.style, { zIndex: '15', transition: 'none', visibility: 'visible', pointerEvents: 'none', opacity: '1' })

    const enterStart = {
      down: 'translate3d(0,100%,0) scale(1.02)',
      up: 'translate3d(0,-100%,0) scale(1.02)',
      left: 'translate3d(100%,0,0) scale(1.02)',
      right: 'translate3d(-100%,0,0) scale(1.02)'
    }[dir]

    const leaveEnd = {
      down: 'translate3d(0,-10%,0) scale(0.98)',
      up: 'translate3d(0,10%,0) scale(0.98)',
      left: 'translate3d(-10%,0,0) scale(0.98)',
      right: 'translate3d(10%,0,0) scale(0.98)'
    }[dir]

    Object.assign(toEl.style, { transform: enterStart, opacity: '1' })

    // Force reflow (fixes Chrome skipping first frame)
    void toEl.offsetHeight
    // allow styles to apply
    requestAnimationFrame(() => {
      const duration = 650
      const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'
      Object.assign(fromEl.style, { transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}` })
      Object.assign(toEl.style, { transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}` })

      // animate
      Object.assign(fromEl.style, { transform: leaveEnd, opacity: '0.6' })
      Object.assign(toEl.style, { transform: 'translate3d(0,0,0)', opacity: '1' })

      const onDone = (ev) => {
        if (ev && (ev.target !== toEl || ev.propertyName !== 'transform')) return
        toEl.removeEventListener('transitionend', onDone)
        // hard reset visual state to avoid any lingering opacity/transform
        Object.assign(fromEl.style, { opacity: '1', transform: 'translate3d(0,0,0)' })
        Object.assign(toEl.style,   { opacity: '1', transform: 'translate3d(0,0,0)' })
        setCurrent(to)
        applyCurrent(to)
        animatingRef.current = false
      }
      toEl.addEventListener('transitionend', onDone)
      // Fallback in case transitionend doesn't fire (e.g., tab switch)
      setTimeout(() => {
        if (animatingRef.current) onDone()
      }, duration + 80)
    })
  }, [applyCurrent, current])

  // Public API via window event so SectionNav can trigger
  useEffect(() => {
    const onGo = (e) => {
      const id = e.detail
      const idx = ids.indexOf(id)
      if (idx !== -1) goToIndex(idx)
    }
    window.addEventListener('goSection', onGo)
    return () => window.removeEventListener('goSection', onGo)
  }, [ids, goToIndex])

  // Wheel + touch (mobile friendly)
  useEffect(() => {
    const el = document
    let touchStartX = 0, touchStartY = 0
    const threshold = 24 // px
    let wheelAccum = 0
    let wheelTimer = null
    let lastTrigger = 0

    const onWheel = (e) => {
      const now = Date.now()
      if (animatingRef.current || now - lastTrigger < 700) { e.preventDefault(); return }
      // Trigger on a single deliberate notch/gesture
      const dy = e.deltaY || 0
      // Normalize tiny trackpad jitters
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
      // Decide forward/back by vertical intent predominance; order-specific animation handles direction
      if (Math.abs(dy) >= Math.abs(dx)) {
        if (dy < 0) goToIndex(Math.min(current + 1, ids.length - 1))
        else goToIndex(Math.max(0, current - 1))
      } else {
        if (dx < 0) goToIndex(Math.min(current + 1, ids.length - 1))
        else goToIndex(Math.max(0, current - 1))
      }
    }

    // capture to intercept before inner scrollables handle it
    el.addEventListener('wheel', onWheel, { passive: false, capture: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel, { capture: true })
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [current, goToIndex, ids.length])

  // Prevent body scroll to avoid in-between content
  useEffect(() => {
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev; document.body.style.overflow = '' }
  }, [])

  return (
    <div className="relative h-dvh overflow-hidden">
      {Array.isArray(children) ? children.map((child, i) => (
        <div
          key={ids[i] || i}
          ref={el => panelsRef.current[i] = el}
          className="fp-panel gradient-bg"
          aria-hidden={i !== current}
        >
          {child}
        </div>
      )) : children}
    </div>
  )
}
