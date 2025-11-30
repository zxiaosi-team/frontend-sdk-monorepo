import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { dependencies, peerDependencies } from './package.json';

const config = defineConfig({
  platform: 'browser', // 作用于浏览器环境
  tsconfig: './tsconfig.json', // 指定 tsconfig 文件
  input: './src/index.ts', // 入口文件
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)], // 将 package.json 中的依赖设为外部依赖
  plugins: [dts()],
  output: {
    dir: 'dist', // 输出目录
    format: 'es', // 输出格式为 ES 模块
    cleanDir: true, // 构建前清理输出目录
    sourcemap: true, // 生成 sourcemap 文件
  },
});

export default config;
