import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Chars from './Chars'
import { ASSETS } from '../assets'
import { REDUCED } from '../lib/motion'

// 首屏：循环背景视频 + 巨字标题逐字浮现。
// play 由 Loader 完成后置 true，动画才开始。
export default function Hero({ play }) {
  const root = useRef(null)
  const [videoOk, setVideoOk] = useState(true)

  useEffect(() => {
    if (!play || REDUCED) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__title .char', {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        stagger: 0.06,
      })
        .from('.hero__kicker', { y: 24, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('.hero__sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__vertical', { x: 20, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.4')
    }, root)
    return () => ctx.revert()
  }, [play])

  return (
    <section className="hero" id="top" ref={root}>
      {videoOk && (
        <video
          className="hero__video"
          src={ASSETS.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoOk(false)}
        />
      )}
      <div className="hero__wash" />
      <div className="hero__content">
        <p className="hero__kicker">A blue–green landscape reverie</p>
        <h1 className="hero__title">
          <Chars text="QIANLI" />
        </h1>
        <p className="hero__sub">A thousand li between us and the mountains.</p>
      </div>
      <div className="hero__vertical">山如青玉，江似素练</div>
      <div className="hero__scroll">
        scroll
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
