import {
  sdk,
  SDKApiPlugin,
  SDKAppPlugin,
  SDKComponentsPlugin,
  SDKConfigPlugin,
  SDKI18nPlugin,
  SDKRouterPlugin,
  SDKStoragePlugin,
  SDKStorePlugin,
} from '@zxiaosi/sdk';
import { loadMicroApp } from 'qiankun';

sdk
  .use(SDKApiPlugin)
  .use(SDKAppPlugin, {
    loadMicroApp,
  })
  .use(SDKComponentsPlugin)
  .use(SDKConfigPlugin)
  .use(SDKI18nPlugin)
  .use(SDKRouterPlugin)
  .use(SDKStoragePlugin)
  .use(SDKStorePlugin)
  .mount('sdk');
