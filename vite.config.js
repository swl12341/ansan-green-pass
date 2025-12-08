import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  // ⚠️ 注意：这里必须和您的 GitHub 仓库名一致
  base: '/ansan-green-pass/',
})