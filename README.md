# 千里江山 · QIANLI

宋代青绿山水主题的单页概念站。风格参考 [oneshot-sakura.vercel.app](https://oneshot-sakura.vercel.app/)。

**技术栈**：Vite + React + GSAP ScrollTrigger + Lenis + Framer Motion（无 Tailwind，纯 CSS 变量）

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # 产物在 dist/
```

## 页面结构

| 屏 | 组件 | 动效 |
|---|---|---|
| 1. Hero | `Hero.jsx` | 循环背景视频 + 巨字逐字浮现 |
| 2. 诗句 | `Poem.jsx` | 行遮罩浮现 + 朱砂印章盖章入场 |
| 3. 江山萬里 | `Scrub.jsx` | **pin + 滚动驱动视频**，巨字逐个进入 |
| 4. 画廊 | `Gallery.jsx` | 图文交错、图片视差 + 缩放入场 |
| 5. 無 | `Still.jsx` | pin + 墨迹晕开视频滚动驱动 |
| 6. 歸來 | `CTA.jsx` | 尾屏 + 回到顶部 |

全局层：`Mist.jsx`（canvas 云雾粒子）、`Grain.jsx`（feTurbulence 纸感颗粒）、`Loader.jsx`（朱砂印章加载页）。

## ⚠️ 当前素材全部是占位符

真实素材生成后丢进 `public/`，然后**只改 [src/assets.js](src/assets.js) 一个文件**：

| 占位文件 | 替换为 | 生成方式 |
|---|---|---|
| `boat.svg` | `boat.jpg`（1200×1800, 2:3） | Midjourney，prompt 见下 |
| `mountains.svg` | `mountains.jpg`（同上） | Midjourney |
| `mountains_grow.mp4` | 同名替换（1280×720, 5s 循环） | 可灵：云雾在青绿山峦间缓慢流动，无缝循环 |
| `river_scroll.mp4` | 同名替换（1280×720, 5s 单向） | 可灵：小舟从左漂到右，单向变化 |
| `ink_bloom.mp4` | 同名替换（1280×720, 5s 单向） | 可灵：浓墨在宣纸上晕开成山形 |

**生图三行铁律**（塞进所有 prompt）：

```
background exactly #ede2c8 warm parchment,
edges dissolve into background, no border,
--ar 2:3
```

**视频压缩**（换真素材后必做）：

```bash
# 普通循环视频
ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -vf "scale=1280:-2" -an -movflags +faststart out.mp4

# 滚动驱动（scrub）视频：加 -g 1 全关键帧，否则拖动会跳帧
ffmpeg -i in.mp4 -vcodec libx264 -g 1 -crf 26 -vf "scale=1280:-2" -an -movflags +faststart out_scrub.mp4
```

## 配色 / 字体

全部在 [src/index.css](src/index.css) 的 `:root`：

```
--paper #ede2c8   仿古皮纸    --qing #3d6b96  石青
--ink   #241c15   浓墨        --lu   #5a8a6e  石绿
--ink-soft #6b5d47 淡墨       --zhu  #9c3324  朱砂
```

字体：Cormorant Garamond（西文）· ZCOOL XiaoWei（中文小字）· Noto Serif SC 900（中文巨字）。

## 部署

```bash
git push  # 推到 GitHub 后
```

[vercel.com](https://vercel.com) → New Project → 选仓库 → 自动识别 Vite → Deploy。
