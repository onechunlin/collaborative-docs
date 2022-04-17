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
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: true, // 样式按需加载
      },
    ]
  ]
});
