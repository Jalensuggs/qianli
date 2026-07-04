import { useEffect, useRef } from 'react'
import { REDUCED } from '../lib/motion'

// 云雾粒子层：40 个半透明椭圆缓慢横向漂移 + sin 上下浮动。
// 纯 canvas 2D，零素材。移动端减半，reduced-motion 只画静态一帧。
export default function Mist() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const isMobile = window.matchMedia('(max-width: 860px)').matches
    const N = isMobile ? 16 : 36
    const rnd = (a, b) => a + Math.random() * (b - a)

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

    // 大多数是纸白雾，少数带一点石青
    const parts = Array.from({ length: N }, () => ({
      x: rnd(-0.2, 1.2),
      y: rnd(0.05, 0.95),
      rx: rnd(70, 230),
      ry: rnd(20, 62),
      speed: rnd(0.12, 0.45),
      phase: rnd(0, Math.PI * 2),
      bob: rnd(6, 22),
      alpha: rnd(0.035, 0.09),
      qing: Math.random() < 0.25,
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        const px = p.x * w
        const py = p.y * h + Math.sin(t * 0.008 + p.phase) * p.bob
        ctx.save()
        ctx.translate(px, py)
        ctx.scale(1, p.ry / p.rx)
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.rx)
        const c = p.qing ? '157,180,196' : '255,255,255'
        g.addColorStop(0, `rgba(${c},${p.alpha})`)
        g.addColorStop(1, `rgba(${c},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(0, 0, p.rx, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        // 横向漂移，出界从左侧重生
        p.x += (p.speed / w) * 1.6
        if (p.x * w - p.rx * 2 > w) p.x = -p.rx / w - 0.05
      }
      t++
      raf = requestAnimationFrame(draw)
    }

    if (REDUCED) {
      draw()
      cancelAnimationFrame(raf) // 只画一帧
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="mist" ref={ref} aria-hidden="true" />
}
