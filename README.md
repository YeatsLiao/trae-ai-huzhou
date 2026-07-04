# 情绪天空 (Emotion Sky)

一个基于 React + Vite 的情绪记录与可视化 Web 应用，将用户情绪映射为动态天气场景，支持城市情绪地图和趋势分析。

## 功能特性

- **情绪选择器**：支持 8 种基本情绪（开心、平静、焦虑、悲伤、愤怒、迷茫、疲惫、活力）
- **天空渲染引擎**：根据情绪渲染对应的天气场景，包含 Canvas 粒子动画效果
- **城市情绪地图**：展示中国各城市的实时情绪分布
- **情绪趋势分析**：个人情绪记录与区域趋势图表
- **情绪小贴士**：提供心理健康建议和情绪管理技巧

## 技术栈

- **框架**：React 19 + Vite 6
- **样式**：Tailwind CSS 4
- **图标**：Lucide React
- **构建**：Vite

## 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- npm >= 10.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
emotion-sky/
├── index.html              # 入口 HTML
├── package.json            # 依赖配置
├── vite.config.js          # Vite 配置
├── eslint.config.js        # ESLint 配置
├── src/
│   ├── main.jsx            # 应用入口
│   ├── App.jsx             # 根组件
│   ├── index.css           # 全局样式和主题
│   ├── components/         # 公共组件
│   │   ├── Navbar.jsx      # 导航栏
│   │   ├── TabBar.jsx      # 底部标签栏
│   │   ├── EmotionCard.jsx # 情绪卡片
│   │   └── EmotionIcon.jsx # 情绪图标
│   ├── pages/              # 页面组件
│   │   ├── HomePage.jsx    # 首页
│   │   ├── MapPage.jsx     # 城市情绪地图
│   │   ├── TrendPage.jsx   # 情绪趋势
│   │   └── MoodPage.jsx    # 心情记录
│   └── data/
│       └── mockData.js     # 模拟数据
├── public/                 # 静态资源
├── dist/                   # 构建产物
└── docs/                   # 文档
```

## 情绪-天气映射

| 情绪 | 天气 | 颜色 |
|------|------|------|
| 开心 | 晴天 | 黄色 |
| 平静 | 多云 | 蓝色 |
| 焦虑 | 小雨 | 灰色 |
| 悲伤 | 大雪 | 深紫 |
| 愤怒 | 雷暴 | 红色 |
| 迷茫 | 雾霾 | 灰白 |
| 疲惫 | 黄昏 | 橙色 |
| 活力 | 极光 | 青色 |

## 设计风格

- 赛博朋克 + 数据可视化美学
- 深色背景（#0a0e1a）
- 强调色：天蓝色(#38bdf8)、紫色(#a78bfa)、粉色(#f472b6)
- 圆润控件（圆角 12–16px）
- 磨砂玻璃效果

## 开发记录

本项目为 TRAE AI 创造力大赛参赛作品，使用 TRAE IDE 全程开发。

## 许可证

MIT License