import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ASSETS } from '../assets'
import { REDUCED } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// 滚动驱动屏：页面 pin 住，滚动进度 = 视频播放进度。
// 「江山万里」四个巨字随进度逐个浮现。
export default function Scrub() {
  const root = useRef(null)
  const vid = useRef(null)
  const [videoOk, setVideoOk] = useState(true)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scrub__pin',
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const v = vid.current
            // 滚动进度直接映射到视频时间轴——scroll-scrubbed video 的核心
            if (v && v.duration && !Number.isNaN(v.duration)) {
              v.currentTime = v.duration * self.progress
            }
          },
        },
      })
      tl.from('.scrub__char', {
        yPercent: 55,
        opacity: 0,
        stagger: 0.5,
        duration: 1.6,
        ease: 'none',
      })
        .from('.scrub__caption', { y: 70, opacity: 0, duration: 1, ease: 'none' }, '-=0.5')
        .to({}, { duration: 0.6 }) // 尾部留白，让文案停留一段
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="scrub" id="jiang" ref={root}>
      <div className="scrub__pin">
        {videoOk ? (
          <video
            ref={vid}
            className="scrub__video"
            src={ASSETS.scrubVideo}
            muted
            playsInline
            preload="auto"
            onError={() => setVideoOk(false)}
            onLoadedMetadata={(e) => {
              // 先 seek 一小步，保证首帧画面渲染出来
              try {
                e.currentTarget.currentTime = 0.001
              } catch { /* 忽略 */ }
            }}
          />
        ) : (
          <div className="scrub__video scrub__video--fallback" />
        )}
        <div className="scrub__wash" />
        <div className="scrub__kanji" aria-hidden="true">
          {'江山万里'.split('').map((c, i) => (
            <span className="scrub__char" key={i}>
              {c}
            </span>
          ))}
        </div>
        <div className="scrub__caption">
          {/* 「江山万里」的信达雅对译 */}
          <h3>Ten thousand li of rivers and mountains.</h3>
          <p>As you scroll, the handscroll unrolls — the boat borrows its current from your hand.</p>
        </div>
      </div>
    </section>
  )
}
