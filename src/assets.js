// ============================================================
// 素材路径统一在这里管理。
// 拿到真实素材（Midjourney 图 / 可灵视频）后，把文件丢进 public/
// 然后只改这一个文件即可，组件不用动。
// ============================================================
export const ASSETS = {
  // 首屏静态背景图（当前为 ffmpeg 抽帧占位；用 ChatGPT/Gemini 生成的青绿山水图替换）
  // 山体/雾气不需要是视频——全局 Mist 云雾 canvas + 呼吸式缩放已经提供动感
  heroImage: '/mountains_grow.jpg',
  // 滚动驱动视频·归舟（占位；用可灵「小舟左漂到右」5s 单向替换）
  scrubVideo: '/river_scroll.mp4',
  // 滚动驱动视频·墨迹晕开（占位；用可灵「浓墨晕开成山」5s 单向替换）
  inkVideo: '/ink_bloom.mp4',
  // Gallery 两张画（AI 生成 2:3 竖版真图，原始 PNG 备份在 assets-src/）
  boat: '/boat.jpg',
  mountains: '/mountains.jpg',
}
