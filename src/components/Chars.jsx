// 把一段文字拆成 .word > .char 的 span 结构，
// 供 GSAP 做逐字浮现（stagger）动画。
// aria-label 保留完整文本，屏幕阅读器不会念出碎片。
export default function Chars({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, i) => (
        <span className="word" key={i} aria-hidden="true">
          {[...word].map((c, j) => (
            <span className="char" key={j}>
              {c}
            </span>
          ))}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
