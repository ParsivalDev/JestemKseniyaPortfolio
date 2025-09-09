// =========================
// FILE: src/components/VideoAutoPlay.jsx
// =========================
'use client'
import { useEffect } from 'react'

export default function useVideoAutoPlay(ref) {
  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const vids = node.querySelectorAll('video')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target
        if (e.isIntersecting && e.intersectionRatio > 0.2) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      })
    }, { threshold: [0, 0.2, 0.4, 1] })

    vids.forEach(v => io.observe(v))
    return () => io.disconnect()
  }, [ref])
}
