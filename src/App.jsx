import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { REDUCED } from './lib/motion'

import Loader from './components/Loader'
import Grain from './components/Grain'
import Mist from './components/Mist'
import Ripples from './components/Ripples'
import Birds from './components/Birds'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Poem from './components/Poem'
import Scrub from './components/Scrub'
import Gallery from './components/Gallery'
import Still from './components/Still'
import CTA from './components/CTA'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false)

  // Lenis 平滑滚动 + ScrollTrigger 官方推荐接法：
  // Lenis 的 raf 挂到 gsap.ticker，滚动事件驱动 ScrollTrigger.update
  useEffect(() => {
    if (REDUCED) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Grain />
      <Mist />
      <Ripples />
      <Birds />
      <Nav />
      <main>
        <Hero play={ready} />
        <Poem />
        <Scrub />
        <Gallery />
        <Still />
        <CTA />
      </main>
    </>
  )
}
