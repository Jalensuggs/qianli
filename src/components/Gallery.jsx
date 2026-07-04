import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Chars from './Chars'
import { ASSETS } from '../assets'
import { REDUCED } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    num: '一',
    title: 'The Homing Boat',
    text: 'One boat on the wide river. It carries every dusk you ever remembered, and asks for nothing back.',
    link: 'Sail with it',
    img: ASSETS.boat,
    alt: '青绿山水：宽阔江面上的一叶归舟',
    right: false,
  },
  {
    num: '二',
    title: 'Cloud Mountains',
    text: 'Above the mist the mountain forgets the year. It keeps only weather, pine, and the patience of stone.',
    link: 'Climb into the cloud',
    img: ASSETS.mountains,
    alt: '青绿山水：云海之上的层叠山峰与小亭',
    right: true,
  },
]

// 画廊：标题逐字上浮，图文左右交错，图片视差 + 缩放入场。
export default function Gallery() {
  const root = useRef(null)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      gsap.from('.gallery__head .char', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.045,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.gallery__head', start: 'top 80%' },
      })
      gsap.from('.gallery__cn', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: '.gallery__head', start: 'top 82%' },
      })
      gsap.utils.toArray('.panel').forEach((panel) => {
        gsap.from(panel.querySelector('.panel__text'), {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 72%' },
        })
        // 图片容器上下视差
        gsap.fromTo(
          panel.querySelector('.panel__img'),
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
        // 图片本体从 1.18 缩到 1，制造「呼吸入场」
        gsap.fromTo(
          panel.querySelector('.panel__img img'),
          { scale: 1.18 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: panel, start: 'top 75%' },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery" id="zhou" ref={root}>
      <div className="gallery__head">
        <span className="gallery__cn">千里江山圖卷</span>
        <h2>
          <Chars text="Rivers & Mountains" />
        </h2>
      </div>
      {PANELS.map((p) => (
        <article className={`panel${p.right ? ' panel--right' : ''}`} key={p.num}>
          <div className="panel__img">
            <img src={p.img} alt={p.alt} loading="lazy" />
          </div>
          <div className="panel__text">
            <span className="panel__num">{p.num}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <a
              className="panel__link"
              href="#visit"
              onClick={(e) => {
                e.preventDefault()
                const el = document.querySelector('#visit')
                if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.6 })
                else el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {p.link}
              <span>→</span>
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}
