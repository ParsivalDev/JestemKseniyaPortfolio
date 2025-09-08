'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import useVideoAutoPlay from './VideoAutoPlay'

export default function PhoneCarousel({ disableWheel = false }) {
  const trackRef = useRef(null)
  useVideoAutoPlay(trackRef)
  const [index, setIndex] = useState(0)

  // ile „kroku” przesuwamy: przy 2-up to połowa szerokości
  const pageStep = useCallback(() => {
    const el = trackRef.current
    return el ? el.clientWidth * 0.5 : 1
  }, [])

  // pionowy scroll → poziomy (wyłączone, jeśli steruje SectionStack)
  useEffect(() => {
    if (disableWheel) return
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
  }, [disableWheel])

  // pager
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const step = pageStep()
      setIndex(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [pageStep])

  const slideTo = useCallback((i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * pageStep(), behavior: 'smooth' })
  }, [pageStep])

  // ---- Twoje materiały ----
  const videos = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
    '/videos/video4.mp4',
  ]

  // Przy 2-up liczba „stron” to (N - 1)
  const pageCount = Math.max(1, videos.length - 1)
  const next = () => slideTo(Math.min(pageCount - 1, index + 1))
  const prev = () => slideTo(Math.max(0, index - 1))

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 id="portfolio" className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-gradient">
        Tak mogą wyglądać twoje rolki!
      </h2>

      <div className="relative w-full max-w-5xl">
        {/* Uwaga: klasa 'two' wymusza 50% szerokości slajdu */}
        <div ref={trackRef} className="carousel two">
          {videos.map((src, n) => (
            <div className="slide" key={n}>
              <div className="phone-wrap">
                <div className="phone-inner">
                  <video
                    src={src}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                    className="phone-video"
                  />
                  <img
                    src="/images/iphone-frame-1080x1920.png"
                    alt=""
                    className="phone-overlay"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strzałki */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <button aria-label="Poprzedni" onClick={prev} className="dot pointer-events-auto">◀</button>
          <button aria-label="Następny" onClick={next} className="dot pointer-events-auto">▶</button>
        </div>
      </div>

      {/* Pager */}
      <div className="flex gap-2">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => slideTo(i)}
            aria-label={`Strona ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${index === i ? 'bg-black/70' : 'bg-black/30'}`}
          />
        ))}
      </div>
    </div>
  )
}
