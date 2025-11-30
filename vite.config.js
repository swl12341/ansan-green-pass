import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ 关键设置：这里必须是 /仓库名/
  // 你的仓库叫 ansan-green-pass，所以这里必须写 /ansan-green-pass/
  base: '/ansan-green-pass/',
})
