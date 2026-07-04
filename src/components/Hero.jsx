import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Chars from './Chars'
import { ASSETS } from '../assets'
import { REDUCED } from '../lib/motion'

// 首屏：静态青绿山水图（呼吸式缓慢缩放）+ 巨字标题逐字浮现。
// 云雾漂浮效果由全局 Mist canvas 提供，这里不需要视频。
// play 由 Loader 完成后置 true，动画才开始。
export default function Hero({ play }) {
  const root = useRef(null)

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
      <img className="hero__bg" src={ASSETS.heroImage} alt="" />
      <div className="hero__wash" />
      <div className="hero__content">
        <p className="hero__kicker">A blue–green landscape reverie</p>
        <h1 className="hero__title">
          <Chars text="QIANLI" />
        </h1>
        {/* 右侧竖排「山如青玉，江似素练」的对译 */}
        <p className="hero__sub">Mountains of green jade, a river of white silk.</p>
      </div>
      <div className="hero__vertical">山如青玉，江似素练</div>
      <div className="hero__scroll">
        scroll
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
