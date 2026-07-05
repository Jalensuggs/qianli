// iOS Safari 滚动驱动视频的两个坑：
// 1. 手机上忽略 preload="auto"，根本不下载数据——设 currentTime 也没有帧可渲染；
// 2. 视频管线必须 play() 过一次才开始出帧，只 seek 的话永远一片空白。
// 解法：整段下载成 blob 再换 src（数据全在本地，随意 seek），
// 然后静音 play()+pause() 一次激活渲染。低电量模式下程序化 play 会被拒，
// 退回到首次触摸时激活——用户要滚动就一定会触摸屏幕。
export function primeScrubVideo(v) {
  if (!v) return () => {}
  let objectUrl = null
  let disposed = false

  const activate = () => {
    v.muted = true // React 的 muted prop 不总落到 DOM 属性上，播放前强制静音
    const p = v.play()
    if (p && p.then) p.then(() => v.pause()).catch(() => {})
  }

  fetch(v.currentSrc || v.src)
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('HTTP ' + r.status))))
    .then((b) => {
      if (disposed) return
      objectUrl = URL.createObjectURL(b)
      const t = v.currentTime
      v.src = objectUrl
      v.load()
      v.addEventListener(
        'loadedmetadata',
        () => {
          v.currentTime = t > 0.001 ? t : 0.001
          activate()
        },
        { once: true }
      )
    })
    .catch(() => {}) // 下载失败就维持原 src，行为跟桌面一致

  activate()
  const onTouch = () => activate()
  window.addEventListener('touchstart', onTouch, { once: true, passive: true })

  return () => {
    disposed = true
    window.removeEventListener('touchstart', onTouch)
    if (objectUrl) URL.revokeObjectURL(objectUrl)
  }
}
