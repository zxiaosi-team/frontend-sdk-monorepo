<!-- 快捷命令： npm run changelog -- --tag xxx -->

## [1.0.0](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.5.2...v1.0.0) - (2026-06-23)

### ⚙️ 杂项任务

- *(ci)* 更新依赖项，支持node24
- *(ci)* 移除 pnpm 安装步骤中的版本和运行配置

### ⚙️ 配置变更

- 添加 pnpm 作为包管理器

### 🐛 Bug 修复

- 格式化文件
- 移除创建项目时的配置提示信息
- *(template)* 调整模板依赖
- *(template)* 调整模板依赖

### 📦 依赖更新

- 更新依赖 @clack/prompts@1.6.0、tsdown@0.22.3

### 🚀 新功能

- *(templates)* 添加新模板
- 添加 react19 模板

## [0.5.2](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.5.1...v0.5.2) - (2026-04-01)

### 🐛 Bug 修复

- *(templates)* 修复 子应用 使用主应用共享组件时，样式丢失问题

## [0.5.1](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.5.0...v0.5.1) - (2026-03-31)

### ⚙️ 杂项任务

- 调整 cliff.toml 文件配置

### ⚙️ 配置变更

- 添加快捷生成 CHANGELOG.md 命令

### 📚 文档更新

- 添加热更新问题提示

### 🚀 新功能

- *(templates)* 添加react-router-dom和sdk依赖外部化配置
- *(templates)* Main-app 模板中添加 react-router、react-router-dom、router 依赖

## [0.5.0](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.4.0...v0.5.0) - (2026-03-26)

### 🚜 代码重构

- *(templates)* 移除 react-router-dom 依赖及相关配置 & 更新依赖 @zxiaosi/sdk@0.5.2
- *(react)* 移除 react-router-dom 依赖及相关配置 & 更新依赖 @zxiaosi/sdk@0.5.2

## [0.4.0](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.2.0...v0.4.0) - (2026-03-22)

### 🚀 新功能

- *(templates)* 模板中添加自定义面包屑和权限组件

## [0.2.0](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.1.4...v0.2.0) - (2026-03-21)

### ⚙️ 配置变更

- 更新 Node 版本要求和构建目标

### 📚 文档更新

- 添加 Node 版本兼容性说明

### 📦 依赖更新

- 更新依赖 tsdown@v0.21.4

### 📦 构建系统

- *(templates)* 更新依赖及Node版本支持

### 🚜 代码重构

- 更新默认包名并移除Vue子应用模板

## [0.1.4](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.1.3...v0.1.4) - (2026-03-19)

### ⚙️ 杂项任务

- 删除 sub-react-tailwindcss 的 package.json 文件

### 🚀 新功能

- 添加 git-cliff 配置文件以生成变更日志
- 优化 MainApp（React）模板
- 优化 sub-react 模板，添加外部依赖配置
- 添加 sub-react-postcss 模板
- 完善 main-react、sub-react、sub-react-postcss 模板

## [0.1.3](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.1.2...v0.1.3) - (2026-03-18)

### ⚙️ 杂项任务

- *(workflows)* 更新 npm 发布流程，添加发布说明链接

### 🚀 新功能

- 添加 _gitignore 文件并在克隆文件夹后重命名为 .gitignore

## [0.1.2](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.1.1...v0.1.2) - (2026-03-17)

### 🚀 新功能

- 重构项目创建流程，更新模板复制和配置文件写入逻辑

## [0.1.1](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.1.0...v0.1.1) - (2026-03-15)

### 🐛 Bug 修复

- 优化模板下载提示信息 & 添加配置指导

### 🚀 新功能

- 添加 sub-react 模板
- 更新模板克隆后文案提示 & 在 .gitignore 中排除 VSCode 配置

## [0.1.0](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.0.3...v0.1.0) - (2026-03-15)

### 🚀 新功能

- 添加 main-react 模板

## [0.0.3](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.0.2...v0.0.3) - (2026-03-12)

### 🐛 Bug 修复

- 优化项目创建逻辑并改进路径处理
- 优化项目名称校验逻辑

## [0.0.2](https://github.com/zxiaosi-team/fontend-create-sdk/compare/v0.0.1...v0.0.2) - (2026-03-10)

### 🚀 新功能

- 在模板克隆后将包名写入 package.json 文件 & 添加包名校验

## [0.0.1](https://github.com/zxiaosi-team/fontend-create-sdk/compare/...v0.0.1) - (2026-03-08)

### ⚙️ 杂项任务

- *(deps)* 更新依赖 tsdown@0.21.0
- *(deps)* 添加依赖 @clack/prompts@1.1.0、picocolors@1.1.1
- *(deps)* 添加依赖 cac@7.0.0
- *(workflows)* 添加 Github 工作流

### 🐛 Bug 修复

- 调整 package.json

### 🚀 新功能

- 初始化项目
- 安装并使用 tsdown 搭建项目
- 更新 tsdown 配置 & 调整文件结构
- 借鉴 create-vite、create-tsdown 完善项目

<!-- 由 git-cliff 生成 -->
