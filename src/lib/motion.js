// 用户系统开启「减少动态效果」时为 true：
// 所有滚动动效/视频 scrub/粒子循环都应跳过，页面保持静态可读。
export const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
