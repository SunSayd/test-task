import vue from '@vitejs/plugin-vue2';
import path from 'path';
import { defineConfig } from 'vite';

export const alias = {
  '@': path.resolve(process.cwd(), 'src'),
};

const commonConfig = defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias,
  },
});

export default commonConfig;
