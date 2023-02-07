import vue from '@vitejs/plugin-vue2';
import { createSvgPlugin } from "vite-plugin-vue2-svg";
import path from 'path';
import { defineConfig } from 'vite';

export const alias = {
  '@': path.resolve(process.cwd(), 'src'),
};

const commonConfig = defineConfig({
  plugins: [
    vue(),
    createSvgPlugin(),
  ],
  resolve: {
    alias,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables/index";`
      },
    },
  },
});

export default commonConfig;
