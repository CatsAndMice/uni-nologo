# uniapp-base

这是一个基于 UniApp 开发的基础项目模板，适用于跨平台应用开发，支持编译到 iOS、Android、H5、小程序等多个平台。

## 项目特点

- 使用 Vue.js 语法开发，结合 UniApp 框架实现跨平台兼容
- 集成常用功能模块和工具类
- 提供丰富的 UI 组件库（基于 TDesign）
- 支持 TypeScript 类型检查
- 包含状态管理、网络请求、本地存储等基础功能

## 目录结构

```
uniapp-base/
├── .gitignore
├── .hbuilderx/
├── README.md
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── src/
│   ├── App.vue
│   ├── api/
│   ├── components/
│   ├── config/
│   ├── main.js
│   ├── manifest.json
│   ├── pages/
│   ├── pages.json
│   ├── shime-uni.d.ts
│   ├── static/
│   ├── stores/
│   ├── tools/
│   ├── uni.scss
│   └── utils/
└── vite.config.js
```

## 功能模块

### 核心功能
- 页面路由管理
- 网络请求封装（包含拦截器和错误处理）
- 本地存储工具
- 全局状态管理
- 工具函数库

### UI 组件
基于 TDesign 组件库提供丰富的 UI 组件，包括但不限于：
- 按钮、输入框、表单组件
- 导航栏、标签页、抽屉菜单
- 加载动画、提示框、消息通知
- 数据展示组件（表格、卡片、列表等）
- 交互组件（弹窗、选择器、滑动条等）

## 开发环境搭建

1. 安装 HBuilderX 或 VSCode
2. 安装 UniApp 插件
3. 安装项目依赖：`npm install`
4. 运行项目：`npm run dev`

## 使用说明

### 页面开发
在 `src/pages` 目录下创建页面文件，使用 Vue 单文件组件格式开发

### 组件使用
在 `components` 目录下存放自定义组件，可在页面中直接引用

### API 调用
在 `api` 目录下定义接口请求，通过封装的 request 模块发送网络请求

### 样式管理
使用 `uni.scss` 作为全局样式文件，支持 Sass 语法

## 技术栈

- Vue.js 3
- UniApp
- TypeScript
- Sass
- Pinia（状态管理）
- TDesign（UI 组件库）

## 贡献指南

欢迎贡献代码！请遵循以下步骤：
1. Fork 项目
2. 创建新分支
3. 提交代码更改
4. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。详情请查看项目根目录下的 LICENSE 文件。