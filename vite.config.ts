import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 后端由 jingshan-one-map 仓库提供，开发时通过代理转发，生产环境由反向代理或同域部署解决。
const apiTarget = process.env.API_TARGET ?? 'http://127.0.0.1:3001'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
    proxy: { '/api': { target: apiTarget, changeOrigin: false } },
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}'],
    },
  },
})
