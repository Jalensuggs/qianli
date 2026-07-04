import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { REDUCED } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// 诗句屏：两行行遮罩浮现 + 朱砂印章「盖章」入场。
export default function Poem() {
  const root = useRef(null)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      gsap.from('.poem__line', {
        yPercent: 115,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.16,
        scrollTrigger: { trigger: '.poem__text', start: 'top 78%' },
      })
      gsap.from('.poem__cn', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      gsap.from('.poem__seal', {
        scale: 1.8,
        opacity: 0,
        rotate: -16,
        duration: 0.7,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: '.poem__seal', start: 'top 88%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="poem" id="shi" ref={root}>
      <p className="poem__cn">江山不老</p>
      <h2 className="poem__text">
        <span className="reveal-line">
          <span className="poem__line">
            The green mountain <em>does not age.</em>
          </span>
        </span>
        <span className="reveal-line">
          <span className="poem__line">
            The jade river <em>runs forever.</em>
          </span>
        </span>
      </h2>
      <div className="poem__seal" aria-hidden="true">
        印
      </div>
    </section>
  )
}
