## 介绍

- 旨在简化微前端功能

- [规划图地址](https://excalidraw.com/#json=s2zc7f8zAhOnhX6NEMKcv,0qIxSEqNMs7vwkq0a6G2yQ)

![](https://cdn.zxiaosi.com/hexo/micro-sdk/sdk1.0.png)

## SDK 使用

- 主应用, `sdk.use(Plugin, options)`, `sdk.mount('sdk')` 使用插件, 挂载到 `window` 上

```js
// main.ts

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

/** 挂载 SDK */
sdk
  .use(SdkApiPlugin, {
    getRoutesApi: async () => ({
      code: 0,
      data: [{ path: '/home', name: '首页', component: 'Home' }],
    }),
    getUserInfoApi: async () => ({
      code: 0,
      data: { user: {}, permissions: ['/home'], roles: [], settings: {} },
    }),
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
```

```js
// App.tsx

import { sdk } from '@zxiaosi/sdk';

function App() {
  const Mainapp = sdk.ui.getComponent('Mainapp');
  return <Mainapp />;
}

export default App;
```

- 子应用 `sdk.extend('sdk')`, 从 `window` 上找实例

```js
// main.ts

import { sdk } from '@zxiaosi/sdk';

// qiankun 生命周期
export async function mount(props: any) {
  sdk.extend('sdk');
  render(props);
}
```
