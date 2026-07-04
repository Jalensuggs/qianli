import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ASSETS } from '../assets'
import { REDUCED } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// 静止屏：墨迹晕开视频被滚动驱动，「無」字缩放浮现，禅意收束。
export default function Still() {
  const root = useRef(null)
  const vid = useRef(null)
  const [videoOk, setVideoOk] = useState(true)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.still__pin',
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const v = vid.current
            if (v && v.duration && !Number.isNaN(v.duration)) {
              v.currentTime = v.duration * self.progress
            }
          },
        },
      })
      tl.from('.still__wu', { scale: 0.75, opacity: 0, duration: 1.2, ease: 'none' })
        .from('.still__cn', { y: 30, opacity: 0, duration: 0.6, ease: 'none' }, '-=0.3')
        .from(
          '.still__line',
          { yPercent: 115, stagger: 0.3, duration: 1, ease: 'none' }
        )
        .to({}, { duration: 0.5 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="still" id="yun" ref={root}>
      <div className="still__pin">
        {videoOk ? (
          <video
            ref={vid}
            className="still__video"
            src={ASSETS.inkVideo}
            muted
            playsInline
            preload="auto"
            onError={() => setVideoOk(false)}
            onLoadedMetadata={(e) => {
              try {
                e.currentTarget.currentTime = 0.001
              } catch { /* 忽略 */ }
            }}
          />
        ) : (
          <div className="still__video still__video--fallback" />
        )}
        <div className="still__wash" />
        <div className="still__wu" aria-hidden="true">
          墨
        </div>
        <div className="still__quote">
          <span className="still__cn">舟自知歸</span>
          <span className="reveal-line">
            <span className="still__line">The boat does not know where it goes —</span>
          </span>
          <span className="reveal-line">
            <span className="still__line">
              <em>and that is the way home.</em>
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
