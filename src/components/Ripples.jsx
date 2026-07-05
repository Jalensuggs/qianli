import { useEffect, useRef } from 'react'
import { REDUCED } from '../lib/motion'

// 水墨涟漪（互动层）：鼠标/手指划过纸面，泛起淡墨圆环，缓缓散开消失。
// 「江似素练」——整个页面是一张水面，指针是船桨。
export default function Ripples() {
  const ref = useRef(null)

  useEffect(() => {
    if (REDUCED) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const ripples = []
    const MAX = 48

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

    const spawn = (x, y, big = false) => {
      if (ripples.length >= MAX) ripples.shift()
      ripples.push({
        x,
        y,
        r: big ? 6 : 3,
        growth: big ? 2.2 : 1.5,
        alpha: big ? 0.16 : 0.11,
      })
    }

    // 移动节流：指针走过一段距离才生成一圈，避免连成实线
    let lastX = -1e4
    let lastY = -1e4
    const onMove = (e) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (dx * dx + dy * dy < 55 * 55) return
      lastX = e.clientX
      lastY = e.clientY
      spawn(e.clientX, e.clientY)
    }
    // 点击=蘸一下水，涟漪更大一圈
    const onDown = (e) => spawn(e.clientX, e.clientY, true)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i]
        p.r += p.growth
        p.growth *= 0.982 // 扩散逐渐减速，像真实水波
        p.alpha *= 0.958
        if (p.alpha < 0.006) {
          ripples.splice(i, 1)
          continue
        }
        // 双环：外环实一点，内环虚一点，更像墨晕
        ctx.strokeStyle = `rgba(36, 28, 21, ${p.alpha})`
        ctx.lineWidth = 1.3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.strokeStyle = `rgba(36, 28, 21, ${p.alpha * 0.55})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 0.62, 0, Math.PI * 2)
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  if (REDUCED) return null
  return <canvas id="ripples" ref={ref} aria-hidden="true" />
}
