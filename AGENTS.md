# AGENTS.md

## Developer Commands

| Command | Description |
|---------|-------------|
| `npm run dev:mp-weixin` | Dev WeChat mini-program (hot reload) |
| `npm run build:mp-weixin` | Build WeChat mini-program for production |

`npm install` automatically runs `weapp-tw patch` (postinstall).

## Project Structure

```
src/
├── pages/           # Page components (download-home, download-detail, download-code, download-tutorial, user-center)
├── components/     # Reusable components
├── hooks/          # Vue composition hooks (useDownload, useCallLimit, useList, usePage, useObject)
├── store/          # Pinia stores (useDownloadDetail)
├── api/            # API calls
├── utils/          # Utilities
├── wxcomponents/   # TDesign mini-program components (copied, not node_modules)
└── App.vue         # Root component
```

## Tech Stack

- uni-app 3.0.0 (Vue 3) + TypeScript
- TDesign mini-program components
- TailwindCSS v4 (rem2rpx enabled)
- Pinia for state management

## Architecture Notes

- **Entry point**: `src/App.vue` and `src/pages.json`
- **Custom components**: Located in `src/wxcomponents/tdesign/` - these are TDesign components copied locally, not from npm
- **Build output**: `dist/dev/mp-weixin` (dev), `dist/build/mp-weixin` (prod)

## Mini-Program Specific

- Pages defined in `src/pages.json`
- Uses `.wxml`, `.wxss`, `.wxs` files (WeChat XML/CSS/filter syntax)
- Custom components need `.json` registration per page or global in `manifest.json`
- Use `uni.downloadFile` for file downloads (not `wx.downloadFile`)

---

## UI Design Guidelines

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#4A90D9` | 按钮、强调元素 |
| Secondary | `#333333` | 主文字 |
| Tertiary | `#666666` | 次要文字 |
| Muted | `#999999` | 辅助文字、提示 |
| Background | `#F5F5F5` | 页面背景 |
| Surface | `#FFFFFF` | 卡片、组件 |
| Border | `#EEEEEE` | 分割线、边框 |
| Success | `#4CAF50` | 成功状态 |
| Warning | `#FFA000` | 警告状态 |

### Typography

| Token | Size | Weight | Line-height |
|-------|------|--------|-------------|
| `text-xl` | 20px | 700 | 1.4 |
| `text-lg` | 16px | 500 | 1.5 |
| `text-base` | 14px | 400 | 1.5 |
| `text-sm` | 12px | 400 | 1.5 |
| `text-xs` | 10px | 400 | 1.4 |

### Spacing System

- 页面内边距: `px-4` (16rpx)
- 区块间距: `mt-3`/`mt-4` (12rpx/16rpx)
- 组件内边距: `p-3`/`p-4` (12rpx/16rpx)
- 间距增量: 4rpx

### Border Radius

- 卡片: `rounded-lg` (16rpx)
- 按钮: `rounded-lg` 适配
- 图片: `rounded-lg` / `rounded-xl`

### Component Heights

- 主按钮: `h-10` (40px) 或 `h-11` (44px)
- 次按钮: `h-8` (32px) 或 `h-9` (36px)
- 图标按钮: `w-9 h-9` (36px)

### Icon Sizes

- 大: 28px → 24px
- 中: 24px → 18px/20px
- 小: 14px → 12px/14px

### Don't Use

- ❌ 渐变背景 (`bg-gradient-to-*`)
- ❌ 装饰性色块 (`w-1 h-5 bg-gradient-to-b`)
- ❌ 彩色阴影 (`shadow-indigo-500/20`)
- ❌ 过度圆角 (`rounded-2xl`/`rounded-3xl`)
- ❌ Emoji作为图标 (`🦆`)
- ❌ 多余动画效果
- ❌ `text-white/90` 透明度 (直接用白色)

### Do Use

- ✅ 纯净背景色 `#F5F5F5` / `#FFFFFF`
- ✅ 简洁分割线 `border-[#EEEEEE]`
- ✅ 扁平化设计
- ✅ 统一间距系统
- ✅ 小程序原生蓝色 `#4A90D9` 作为品牌色
- ✅ 直接的颜色值（如 `#fff` 而非 `white/90`）- ✅ SVG图标（TDesign t-icon）
- ✅ 简洁的激活态反馈

### Mobile Best Practices

- 最小触摸区域: 44×44px (iOS) / 48×48dp (Android)
- 组件间距: 不少于 8px
- 文号: 最少 12px
- 避免水平滚动
- 安全区域: 适配刘海/底部手势区域