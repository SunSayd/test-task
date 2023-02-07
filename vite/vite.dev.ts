import { defineConfig, mergeConfig } from 'vite';

import commonConfig from './vite.common';

const config = defineConfig({
  server: {
    host: true,
    port: 3010,
    open: true,
  },
});

export default mergeConfig(commonConfig, config);
