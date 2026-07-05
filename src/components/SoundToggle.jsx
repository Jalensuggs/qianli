import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../assets'

// 背景音乐（用户原创曲《千里》）+ 极简声波开关。
// 浏览器不允许页面在无交互时出声：先直接尝试播放，
// 被自动播放策略拦下时，在用户第一次触摸/滚轮/按键的瞬间开播——
// 对滚动叙事站来说体验上约等于「一打开就有声」。
export default function SoundToggle() {
  const audioRef = useRef(null)
  const wantSound = useRef(true) // 用户意愿：点静音后交互不再自动开播
  const [on, setOn] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    a.volume = 0.5 // 是底色不是主角，压低一点

    const tryPlay = () => {
      if (!wantSound.current) return
      a.play().catch(() => {}) // 被拦截时静默失败，等下一次交互
    }
    tryPlay()

    const events = ['pointerdown', 'touchstart', 'wheel', 'keydown']
    const kick = () => tryPlay()
    events.forEach((ev) => window.addEventListener(ev, kick, { passive: true }))

    // 切到后台暂停，切回来续播（尊重静音意愿）
    const onVis = () => {
      if (document.hidden) a.pause()
      else tryPlay()
    }
    document.addEventListener('visibilitychange', onVis)

    // 图标状态跟着 audio 真实状态走，不自己猜
    const onPlay = () => setOn(true)
    const onPause = () => setOn(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, kick))
      document.removeEventListener('visibilitychange', onVis)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.pause()
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (a.paused) {
      wantSound.current = true
      a.play().catch(() => {})
    } else {
      wantSound.current = false
      a.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={ASSETS.bgm} loop preload="auto" />
      <button
        type="button"
        className={`sound${on ? '' : ' sound--off'}`}
        onClick={toggle}
        aria-label={on ? '静音背景音乐' : '播放背景音乐'}
        aria-pressed={on}
        title={on ? '静音' : '播放'}
      >
        <span className="sound__bars" aria-hidden="true">
          <i className="sound__bar" />
          <i className="sound__bar" />
          <i className="sound__bar" />
          <i className="sound__bar" />
        </span>
      </button>
    </>
  )
}
