## 项目介绍

- 整个 `SDK` 都是围绕 `sdk.app.user`、 `sdk.app.menus`、`sdk.app.microApps` 进行设计的，旨在简化微前端应用的开发

- 主应用 `sdk.use(plugin, opts).mount('sdk')` → 微应用 `sdk.extend('sdk')` → 共享同一套状态与能力

- 架构图

  ![](https://cdn.zxiaosi.com/hexo/micro-sdk/sdk1.0.png)

- [架构图地址](https://excalidraw.com/#json=D71Fw3vbEUxoaA-15i2Cj,VMKGJ8x_P3I1MrMbVBjgcw)

- [更多详情](https://zxiaosi.com/archives/113adf2d.html)

## 快速开始

```sh
npm install -g @zxiaosi/create-sdk

npx create-sdk
```
