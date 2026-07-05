# 千里江山 · QIANLI

宋代青绿山水主题的沉浸式单页概念站。灵感来自 [oneshot-sakura.vercel.app](https://oneshot-sakura.vercel.app/)，以 Vibecoding 方式从零构建。

**技术栈**：Vite + React 19 · GSAP ScrollTrigger · Lenis 平滑滚动 · Framer Motion · Canvas 2D（无 Tailwind，纯 CSS 变量）

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # 产物在 dist/
```

## 页面结构

| 屏 | 组件 | 动效 |
|---|---|---|
| 1. 诗 · Hero | `Hero.jsx` | 静态山水图 + 48s 呼吸缩放 + 巨字逐字浮现 |
| 2. 诗句屏 | `Poem.jsx` | 行遮罩浮现 + 朱砂印章盖章入场 |
| 3. 江山万里 | `Scrub.jsx` | **pin + 滚动驱动视频**，巨字逐个进入 |
| 4. 画廊 | `Gallery.jsx` | 图文交错、图片视差 + 缩放入场 |
| 5. 墨 | `Still.jsx` | pin + 墨迹晕开视频滚动驱动 |
| 6. 归来 | `CTA.jsx` | 尾屏 + 回到顶部 |

**全局特效层：**
- `Mist.jsx` — Canvas 云雾粒子（背景飘动）
- `Grain.jsx` — SVG feTurbulence 纸感颗粒
- `Loader.jsx` — 朱砂印章加载页（Framer Motion）
- `Ripples.jsx` — 水墨涟漪（鼠标/触摸互动，Canvas 2D）
- `Birds.jsx` — 远山飞鸟（每 20~40 秒掠过一队，Canvas 2D）
- `SoundToggle.jsx` — 背景音乐 + 导航栏声波静音开关（自动播放被浏览器拦截时，首次交互瞬间开播）

## 素材（AI 生成）

| 文件 | 内容 | 工具 |
|---|---|---|
| `mountains_grow.jpg` | 首屏静态背景（青绿长卷） | ChatGPT / Gemini |
| `boat.jpg` | 画廊图一：归舟入江 | ChatGPT / Gemini |
| `mountains.jpg` | 画廊图二：远山叠翠 | ChatGPT / Gemini |
| `seal.png` | 诗句屏朱砂印章 | ChatGPT / Gemini |
| `river_scroll.mp4` | 江山万里屏滚动驱动视频 | 可灵首尾帧 |
| `ink_bloom.mp4` | 墨屏滚动驱动视频 | 可灵首尾帧 |
| `qianli.mp3` | 背景音乐《千里》 | 用户原创 |

**滚动驱动视频必须用 `-g 1` 重编码**（全关键帧），否则拖动会跳帧：

```bash
ffmpeg -i in.mp4 -vcodec libx264 -g 1 -crf 26 -vf "scale=1280:-2" -an -movflags +faststart out_scrub.mp4
```

## 配色 / 字体

全部在 [`src/index.css`](src/index.css) 的 `:root`：

```
--paper   #ede2c8  仿古皮纸    --qing  #3d6b96  石青
--ink     #241c15  浓墨        --lu    #5a8a6e  石绿
--ink-soft #6b5d47 淡墨       --zhu   #9c3324  朱砂
```

字体：Cormorant Garamond（西文） · ZCOOL XiaoWei（中文标题） · Noto Serif SC 900（巨字）

## 部署

推送到 GitHub 后，在 [vercel.com](https://vercel.com) → New Project → 导入仓库 → 自动识别 Vite → Deploy。
