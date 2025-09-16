'use client'
import { useEffect } from 'react'

export default function CloudIntro() {
  useEffect(() => {
    const run = () => {
      const gsap = typeof window !== 'undefined' ? window.gsap : null
      if (!gsap) return

      const page = document.querySelector('.page-root')
      const wrap = document.querySelector('.clouds')
      const clouds = Array.from(document.querySelectorAll('.clouds .cloud'))
      if (!page || !wrap || clouds.length === 0) return

      const dirs = ['left', 'right', 'up', 'down']
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => { if (wrap) wrap.style.display = 'none' }
      })

      // Phase 1: clouds out + backdrop fade
      tl.to('.clouds-backdrop', { opacity: 0, duration: 1.4, ease: 'power1.out' }, 0)

      clouds.forEach((el, i) => {
        const dir = dirs[i % dirs.length]
        const spreadX = 110 + Math.random() * 25
        const spreadY = 110 + Math.random() * 25
        const to = {
          x: dir === 'left' ? `-${spreadX}vw` : dir === 'right' ? `${spreadX}vw` : 0,
          y: dir === 'up' ? `-${spreadY}vh` : dir === 'down' ? `${spreadY}vh` : 0,
          opacity: 0,
          duration: 1.6,
          ease: 'power3.inOut',
        }
        const delay = Math.random() * 0.2
        tl.to(el, to, 0 + delay)
      })

      // Phase 2: start zoom sooner to overlap with clouds
      tl.fromTo(page,
        { scale: 0.88, filter: 'blur(2px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power2.out' },
        0.35
      )

      // safety hide in case timeline is interrupted
      setTimeout(() => { if (wrap && wrap.style.display !== 'none') wrap.style.display = 'none' }, 3500)
    }

    if (document.readyState === 'complete') run()
    else window.addEventListener('load', run, { once: true })
    return () => window.removeEventListener('load', run)
  }, [])

  return (
    <div className="clouds" aria-hidden>
      <div className="clouds-backdrop" />
      {/* Use a single asset duplicated; place under /public/images/cloud.png */}
      <img src="/images/cloud.png" alt="" className="cloud p1" />
      <img src="/images/cloud.png" alt="" className="cloud p2" />
      <img src="/images/cloud.png" alt="" className="cloud p3" />
      <img src="/images/cloud.png" alt="" className="cloud p4" />
      <img src="/images/cloud.png" alt="" className="cloud p5" />
      <img src="/images/cloud.png" alt="" className="cloud p6" />
      <img src="/images/cloud.png" alt="" className="cloud p7" />
      <img src="/images/cloud.png" alt="" className="cloud p8" />
      <img src="/images/cloud.png" alt="" className="cloud p9" />
      <img src="/images/cloud.png" alt="" className="cloud p10" />
      <img src="/images/cloud.png" alt="" className="cloud p11" />
      <img src="/images/cloud.png" alt="" className="cloud p12" />
    </div>
  )
}
