'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import useVideoAutoPlay from './VideoAutoPlay'

export default function PhoneCarousel({ disableWheel = false }) {
  // 3D ring
  const stageRef = useRef(null)
  useVideoAutoPlay(stageRef)
  const [index, setIndex] = useState(0);
  const [autoScrolled, setAutoScrolled] = useState(false);

  const videos = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
    '/videos/video4.mp4',
  ]

  const count = videos.length
  const theta = 360 / count

  // position items in a 3D ring
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const slides = Array.from(el.querySelectorAll('.slide3d'))
    const w = slides[0]?.getBoundingClientRect().width || 300
    slides.forEach((s) => s.style.setProperty('--w', `${w}px`))
    slides.forEach((s, i) => {
      const leftIndex = (index - 1 + count) % count
      const rightIndex = (index + 1) % count
      s.classList.remove('cf-center','cf-left','cf-right','cf-hidden')
      if (i === index) s.classList.add('cf-center')
      else if (i === leftIndex) s.classList.add('cf-left')
      else if (i === rightIndex) s.classList.add('cf-right')
      else s.classList.add('cf-hidden')
    })

    // ensure ALL videos play on mount (mobile fix)
    const slidesEls = el.querySelectorAll('.slide3d')
    slidesEls.forEach((s) => {
      const v = s.querySelector('video')
      if (!v) return
      // Always play on mobile (<=640px), never pause
      if (window.innerWidth <= 640) {
        v.play().catch(() => {})
      } else {
        // On desktop, only center plays
        if (s.classList.contains('cf-center')) v.play().catch(() => {})
        else v.pause()
      }
    })
  }, [index, count])

  const slideTo = useCallback((i) => {
    const el = stageRef.current
    if (!el) return
    const n = (i + count) % count
    setIndex(n)
  }, [count])

  const next = () => slideTo(index + 1)
  const prev = () => slideTo(index - 1)

  // Drag to rotate (desktop/mobile). Might be overridden by outer stack, but arrows always work.
  useEffect(() => {
    const root = stageRef.current?.parentElement
    if (!root) return
    let sx = 0, dx = 0, down = false
    const onDown = (e) => { down = true; sx = 'touches' in e ? e.touches[0].clientX : e.clientX }
    const onMove = (e) => { if (!down) return; const x = 'touches' in e ? e.touches[0].clientX : e.clientX; dx = x - sx }
    const onUp = () => { if (!down) return; if (dx < -20) next(); else if (dx > 20) prev(); down = false; dx = 0 }
    root.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    root.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp, { passive: true })
    return () => {
      root.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      root.removeEventListener('touchstart', onDown)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [next, prev])

  // Auto-scroll forward once when section enters viewport for the first time (only if not at top)
  useEffect(() => {
    if (autoScrolled) return;
    const section = stageRef.current?.closest('section');
    if (!section) return;
    let triggered = false;
    const handler = (entries) => {
      if (!triggered && entries[0].isIntersecting) {
        // Only trigger if user has scrolled down (section not at top of viewport)
        const rect = entries[0].boundingClientRect;
        if (rect.top < 50) { // section is near top, don't trigger
          return;
        }
        triggered = true;
        setTimeout(() => {
          setIndex(1);
          setAutoScrolled(true);
        }, 400);
      }
    };
    const observer = new window.IntersectionObserver(handler, { threshold: 0.5 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [autoScrolled]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 id="portfolio" className="text-2xl md:text-3xl font-extrabold text-center mb-1 text-gradient">
        Tak mogą wyglądać twoje rolki!
      </h2>
      <span className='font-bold'>Aby zobaczyć video na telefonie - PRZEWIŃ!</span>

      <div className="relative w-full max-w-5xl">
        <div className="cf-viewport">
          <div className="carousel-3d">
          <div ref={stageRef} className="stage">
            {videos.map((src, n) => {
              const isCenter = n === index
              const isSide = n === (index + 1) % count || n === (index - 1 + count) % count
              const cls = isCenter ? 'cf-center' : isSide ? (n === (index - 1 + count) % count ? 'cf-left' : 'cf-right') : 'cf-hidden'
              return (
              <div className={`slide3d ${cls}`} key={n}>
                <div className={`phone-wrap`}>
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
                  <div className="phone-edge l" aria-hidden />
                  <div className="phone-edge r" aria-hidden />
                </div>
              </div>
            )})}
          </div>
          </div>
        </div>

        {/* Strzałki */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <button aria-label="Poprzedni" onClick={prev} className="dot pointer-events-auto" title="Poprzedni">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button aria-label="Następny" onClick={next} className="dot pointer-events-auto" title="Następny">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Pager */}
      <div className="flex gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => slideTo(i)}
            aria-label={`Slajd ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${index === i ? 'bg-black/70' : 'bg-black/30'}`}
          />
        ))}
      </div>
    </div>
  )
}
