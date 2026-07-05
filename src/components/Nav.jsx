import SoundToggle from './SoundToggle'

// 一字一章，顺序与页面滚动顺序一致：
// 诗(诗句屏) → 江(江山万里卷) → 画(画廊) → 墨(墨屏) → 归来(尾屏)
const LINKS = [
  ['诗', '#shi'],
  ['江', '#jiang'],
  ['画', '#hua'],
  ['墨', '#mo'],
]

// 导航点击走 Lenis 平滑滚动；Lenis 不在（reduced-motion）时退回原生 smooth。
export default function Nav() {
  const go = (e, hash) => {
    e.preventDefault()
    const el = document.querySelector(hash)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="nav">
      <a className="nav__brand" href="#top" onClick={(e) => go(e, '#top')}>
        <span className="nav__mark">画</span>
        <span className="nav__word">QIANLI</span>
      </a>
      <div className="nav__links">
        {LINKS.map(([label, hash]) => (
          <a key={hash} href={hash} onClick={(e) => go(e, hash)}>
            {label}
          </a>
        ))}
        <a className="nav__cta" href="#visit" onClick={(e) => go(e, '#visit')}>
          归来
        </a>
        <SoundToggle />
      </div>
    </nav>
  )
}
