// =========================
// FILE: src/components/PhoneCarousel.jsx
// =========================
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import useVideoAutoPlay from './VideoAutoPlay'

export default function PhoneCarousel() {
  const trackRef = useRef(null)
  useVideoAutoPlay(trackRef)
  const [index, setIndex] = useState(0)

  // Wheel Y -> scroll X inside only this block
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Update pager index
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth)
      setIndex(i)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const slideTo = useCallback((i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }, [])

  const next = () => slideTo(Math.min(3, index + 1))
  const prev = () => slideTo(Math.max(0, index - 1))

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Wybrane realizacje</h2>

      <div className="relative w-full max-w-5xl">
        <div ref={trackRef} className="carousel">
          {[1,2,3,4].map((n) => (
            <div className="slide" key={n}>
              <div className="phone-shell phone-notch">
                <div className="phone-screen bg-black">
                  {/* TODO: podmień pliki wideo w /public/videos */}
                  <video
                    src={`/videos/video${n}.mp4`}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <button aria-label="Poprzedni" onClick={prev} className="dot pointer-events-auto">◀</button>
          <button aria-label="Następny" onClick={next} className="dot pointer-events-auto">▶</button>
        </div>
      </div>

      {/* Pager */}
      <div className="flex gap-2">
        {[0,1,2,3].map(i => (
          <button key={i} onClick={() => slideTo(i)} aria-label={`Slajd ${i+1}`} className={`w-2.5 h-2.5 rounded-full ${index===i ? 'bg-black/70' : 'bg-black/30'}`}></button>
        ))}
      </div>
    </div>
  )
}