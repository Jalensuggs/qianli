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

## 素材状态：已全部替换为 AI 真素材（2026-07-04）

| 文件 | 内容 | 来源 |
|---|---|---|
| `mountains_grow.jpg` | 首屏静态背景（原方案为视频，改为静态图+呼吸缩放） | ChatGPT/Gemini 生图 |
| `boat.jpg` / `mountains.jpg` | 画廊两张 2:3 竖版青绿山水 | ChatGPT/Gemini 生图 |
| `river_scroll.mp4` | 归舟右→左（滚动驱动，已 `-g 1` 全关键帧） | 可灵首尾帧 |
| `ink_bloom.mp4` | 墨迹晕开成山（滚动驱动，已 `-g 1`） | 可灵首尾帧 |

原始 PNG 大图备份在 `assets-src/`（已 gitignore，不会部署）。

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
