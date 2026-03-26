import { defineConfig } from 'tsdown';

const config = defineConfig({
  entry: './src/index.ts', // 入口文件
  platform: 'browser', // 作用于浏览器环境
  tsconfig: './tsconfig.json', // 指定 tsconfig 文件
  format: 'esm', // 输出格式
  minify: true, // 压缩代码
  css: {
    inject: true, // 保留 css 注入
    minify: true, // 压缩 css
  },
});

export default config;
