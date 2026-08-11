import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/cli.ts',
  minify: true,
  platform: 'node',
  target: 'node20',
  fixedExtension: false,
});
