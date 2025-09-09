'use client'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ScrollHint({ id }) {
  // Show on all except the last section
  const show = id !== 'experience'
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (!show) return
    let touchY = null
    let timer = null
    const scheduleHide = () => {
      if (timer) return
      timer = setTimeout(() => setVisible(false), 5000)
    }
    const onWheel = (e) => {
      // hide only when user scrolls downwards
      if (e.deltaY > 0) scheduleHide()
    }
    const onTouchStart = (e) => { touchY = e.touches[0]?.clientY ?? null }
    const onTouchEnd = (e) => {
      if (touchY == null) return
      const dy = (e.changedTouches[0]?.clientY ?? touchY) - touchY
      // swipe up (dy < 0) typically scrolls down content
      if (dy < -8) scheduleHide()
      touchY = null
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [show])

  if (!show || !visible) return null

  return (
    <div className="scroll-hint select-none" aria-hidden>
      <div className="arrows">
        <ChevronDown className="w-4 h-4" />
        <ChevronDown className="w-4 h-4" />
        <ChevronDown className="w-4 h-4" />
      </div>
      <div className="label">SCROLL</div>
    </div>
  )
}
