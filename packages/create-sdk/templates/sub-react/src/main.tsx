import { sdk } from '@zxiaosi/sdk';
import { createRoot, type Root } from 'react-dom/client';

import { name } from '../package.json';
import App from './App.tsx';

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

export async function bootstrap() {
  console.log(`${name} bootstrap`);
}

export async function mount(props: any) {
  console.log(`${name} mount`, props);
  sdk.extend(props?.sdk?.name); // 继承 sdk 功能
  render(props);
}

export async function unmount(props: any) {
  console.log(`${name} unmount`, props);
  root.unmount();
}

export async function update(props: any) {
  console.log(`${name} update`, props);
}
