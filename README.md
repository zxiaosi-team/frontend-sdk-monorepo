## 路线规划

- [规划图地址](https://excalidraw.com/#json=_CghR9MKEcgUt4SaYUXFY,V9n_bmADhi6JXp2TUk-ObA)

![](https://cdn.zxiaosi.com/hexo/micro-sdk/sdk0.2.png)

- [更多详情](https://zxiaosi.com/archives/c6c40209.html)

## 快速开始

```bash
# 安装 @zxiaosi/sdk 对应的版本 0.5.x
npm install -g @zxiaosi/create-sdk

npx create-sdk
```

## 项目介绍

- 整个 `SDK` 都是围绕 `getRoutesApi`、`getUserInfoApi` 这两个接口进行设计的，旨在简化微前端应用的开发

- `getRoutesApi` 接口用于获取应用路由信息，包括主应用和微应用的路由配置。因为 `Qiankun` 的 `entry` 配置比较特殊，所以 `主应用` 需要使用 `vite-plugin-mock` 插件 `mock` 接口
  - 在本地开发是本地服务 `"entry": "http://localhost:5174"`
  - 在生产环境是文件路径 `"entry": "/subapp/"`

- `getUserInfoApi` 接口用于获取用户相关数据，以便进行权限控制和个性化设置。
  - `user`：用户信息（必选）
  - `permissions`：权限信息（必选）
  - `role`：角色信息（可选）
  - `setting`：配置信息（可选）

## 核心代码

### 主应用

- 在 `main.ts` 中进行 `SDK` 的挂载

  ```js
  import {
    sdk,
    SdkApiPlugin,
    SdkAppPlugin,
    SdkClientPlugin,
    SdkConfigPlugin,
    SdkI18nPlugin,
    SdkStoragePlugin,
    SdkStorePlugin,
    SdkUIPlugin,
  } from '@zxiaosi/sdk';
  import { createRoot } from 'react-dom/client';
  import App from './App';

  const getRoutesApi = async () => ({
    code: 0,
    data: [
      { path: '/home', name: '首页', component: 'Home' },
      { path: '/subapp', name: '微应用', component: 'Microapp',
        routeAttr: `{"name": "subapp", "entry": "http://localhost:5174", "activeRule": "/subapp", "rootId": "sub-app"}`,
      },
    ],
  })

  const getUserInfoApi = async () => ({
     code: 0,
    data: { user: {}, permissions: ['/home', '/subapp'], roles: [], settings: {} },
  })

  const loginApi = async () => ({ code: 0, data: { token: 'xxxx' } })

  /** 挂载 SDK */
  sdk
    .use(SdkApiPlugin, {
      getRoutesApi,
      getUserInfoApi,
      loginApi,
    })
    .use(SdkAppPlugin)
    .use(SdkClientPlugin)
    .use(SdkConfigPlugin, {
      qiankunMode: 'router',
      proLayoutConfig: {
        title: 'Demo',
        layout: 'mix',
      },
    })
    .use(SdkI18nPlugin)
    .use(SdkStoragePlugin)
    .use(SdkStorePlugin)
    .use(SdkUIPlugin, { Home: () => <div>Home</div> })
    .mount('sdk');

  /** 渲染主应用 */
  createRoot(document.getElementById('root')!).render(<App />);
  ```

- 在 `App.tsx` 中使用 `<Mainapp />` 组件渲染主应用

  ```js
  import { sdk } from '@zxiaosi/sdk';

  function App() {
    const Mainapp = sdk.ui.getComponent('Mainapp');
    return <Mainapp />;
  }

  export default App;
  ```

### 微应用

- 在 `vite.config.ts` 中配置 `vite-plugin-qiankun-lite` 插件

  ```js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import qiankun from 'vite-plugin-qiankun-lite';

  export default defineConfig({
    plugins: [
      react(),
      qiankun({ name: 'subapp', sandbox: !!process.env.VITE_SANDBOX }),
    ],
    server: {
      port: 5174,
    },
  });
  ```

- 在 `main.ts` 中进行 `SDK` 的继承

  ```js
  import { sdk } from '@zxiaosi/sdk';
  import { createRoot, type Root } from 'react-dom/client';
  import App from './App.tsx';
  import './index.css';

  let root: Root;
  const render = (props: any = {}) => {
    const container = props?.container
      ? props.container.querySelector('#root')
      : document.getElementById('root');

    root = createRoot(container);

    root.render(<App />);
  };

  if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }

  export async function mount(props: any) {
    console.log(`Microapp mount`, props);
    sdk.extend('sdk'); // 继承 sdk 功能
    render(props);
  }

  export async function unmount(props: any) {
    console.log(`Microapp unmount`, props);
    root.unmount();
  }
  ```

- [可参考项目](https://github.com/zxiaosi-team/fontend-sdk/tree/master/packages)

## 注意事项

- `SDK` 不能在 `组件外` 进行使用，否则会报 `SDK 未初始化` 错误

- 微应用使用 `sdk.ui.renderComponent('xxx')` 时，会报 `React 多实例` 的错误，需要使用 `vite-plugin-externals` 插件将 `React` 等依赖排除在打包之外。[更多详情](https://zxiaosi.com/archives/bc84a75a.html)
  - 在主/子应用的 `index.html` 中使用 `cdn` 的方式去加载 `react` 和 `react-dom` 包

    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <title>%VITE_APP_TITLE%</title>
        <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
    ```

  - 在主/子应用中使用 `vite-plugin-externals` 插件去排除 `react` 和 `react-dom` 包

    ```ts
    import { viteExternalsPlugin } from 'vite-plugin-externals';

    export default defineConfig({
      plugins: [
        viteExternalsPlugin({
          react: 'React',

          // 开发环境不排除 react-dom 依赖, 防止热更新失效
          // 或者 浏览器安装 React Developer Tools 插件
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
        }),
      ],
    });
    ```
