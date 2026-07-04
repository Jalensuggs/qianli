// ============================================================
// 素材路径统一在这里管理。
// 拿到真实素材（Midjourney 图 / 可灵视频）后，把文件丢进 public/
// 然后只改这一个文件即可，组件不用动。
// ============================================================
export const ASSETS = {
  // 首屏循环背景视频（当前为 ffmpeg 占位渐变；用可灵「云雾流动」5s 循环替换）
  heroVideo: '/mountains_grow.mp4',
  // 滚动驱动视频·归舟（占位；用可灵「小舟左漂到右」5s 单向替换）
  scrubVideo: '/river_scroll.mp4',
  // 滚动驱动视频·墨迹晕开（占位；用可灵「浓墨晕开成山」5s 单向替换）
  inkVideo: '/ink_bloom.mp4',
  // Gallery 两张画（当前为手绘 SVG 占位；用 Midjourney 2:3 竖版图替换后改成 .jpg）
  boat: '/boat.svg',
  mountains: '/mountains.svg',
}
