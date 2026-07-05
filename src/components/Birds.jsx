import { useEffect, useRef } from 'react'
import { REDUCED } from '../lib/motion'

// 远山飞鸟（事件层）：每隔 20~40 秒，一小队水墨飞鸟掠过画面上部。
// 宋画「远山 + 飞鸟」的标配，稀有出现 = 每次看到都是小惊喜。
export default function Birds() {
  const ref = useRef(null)

  useEffect(() => {
    if (REDUCED) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf, timer
    let birds = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const rnd = (a, b) => a + Math.random() * (b - a)

    const spawnFlock = () => {
      if (document.visibilityState !== 'visible') return
      const fromLeft = Math.random() < 0.5
      const count = 3 + Math.floor(Math.random() * 3) // 3~5 只
      const baseY = rnd(0.1, 0.32) * h
      const speed = rnd(70, 105) * (fromLeft ? 1 : -1)
      const size = rnd(9, 13)
      for (let i = 0; i < count; i++) {
        // 松散的斜排队形，每只错开一点
        birds.push({
          x: (fromLeft ? -60 : w + 60) - (fromLeft ? 1 : -1) * i * rnd(26, 44),
          y: baseY + i * rnd(8, 18) * (Math.random() < 0.5 ? 1 : -1),
          vx: speed * rnd(0.94, 1.06),
          size: size * rnd(0.85, 1.15),
          phase: rnd(0, Math.PI * 2),
          flap: rnd(5.5, 7.5),
          bob: rnd(4, 9),
          bobFreq: rnd(0.6, 1.1),
          alpha: rnd(0.4, 0.55),
        })
      }
    }

    // 首队 6~12 秒后出现，之后每 20~40 秒一队
    const schedule = (first = false) => {
      timer = setTimeout(
        () => {
          spawnFlock()
          schedule()
        },
        first ? rnd(6000, 12000) : rnd(20000, 40000)
      )
    }
    schedule(true)
    // 调试钩子：控制台执行 __flyBirds() 可立即放一队鸟
    window.__flyBirds = spawnFlock

    let last = performance.now()
    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, w, h)
      const t = now / 1000
      birds = birds.filter((b) => (b.vx > 0 ? b.x < w + 80 : b.x > -80))
      for (const b of birds) {
        b.x += b.vx * dt
        const y = b.y + Math.sin(t * b.bobFreq + b.phase) * b.bob
        // 扇翅：翅尖上下摆动
        const flap = Math.sin(t * b.flap + b.phase)
        const s = b.size
        const wingY = -(0.28 + 0.42 * flap) * s
        const dir = b.vx > 0 ? 1 : -1
        ctx.strokeStyle = `rgba(36, 28, 21, ${b.alpha})`
        ctx.lineWidth = 1.4
        ctx.lineCap = 'round'
        // 两笔弧线 = 一只远处的鸟
        ctx.beginPath()
        ctx.moveTo(b.x, y)
        ctx.quadraticCurveTo(b.x - s * 0.55 * dir, y + wingY, b.x - s * dir, y + wingY * 0.35)
        ctx.moveTo(b.x, y)
        ctx.quadraticCurveTo(b.x + s * 0.55 * dir, y + wingY, b.x + s * dir, y + wingY * 0.35)
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
      delete window.__flyBirds
    }
  }, [])

  if (REDUCED) return null
  return <canvas id="birds" ref={ref} aria-hidden="true" />
}
