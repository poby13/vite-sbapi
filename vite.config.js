import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    // Vite는 기본적으로 소스 맵을 지원
    sourcemap: true
  },
  plugins: [react()],
})
