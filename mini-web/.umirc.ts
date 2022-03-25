import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  proxy: {
    '/api/*': {
      target: 'http://localhost:7001',
      changeOrigin: true
    }
  }
});
