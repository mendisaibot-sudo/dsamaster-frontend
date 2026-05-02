import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dsamaster-frontend/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: ['.trycloudflare.com', 'localhost', '127.0.0.1', '0.0.0.0']
  }
})