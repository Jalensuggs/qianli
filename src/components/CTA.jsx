import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Chars from './Chars'
import { REDUCED } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// 尾屏：欢迎语 + 回到顶部。
export default function CTA() {
  const root = useRef(null)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      gsap.from('.cta__cn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })
      gsap.from('.cta h2 .char', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.02,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta h2', start: 'top 78%' },
      })
      gsap.from('.cta__foot, .cta__btn', {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        scrollTrigger: { trigger: '.cta__foot', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const backToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="cta" id="visit" ref={root}>
      <span className="cta__cn">归来</span>
      <h2>
        <Chars text="Come home and watch the spring river." />
      </h2>
      <p className="cta__foot">
        Open when the mist lifts.
        <br />
        Anywhere paper meets pigment.
      </p>
      <button className="cta__btn" type="button" onClick={backToTop}>
        Set sail again ↑
      </button>
      <div className="cta__org">
        <span>© 2026 Qianli Atelier · 江山无恙</span>
        <span className="cta__org-cn">千里江山图卷</span>
      </div>
    </footer>
  )
}
