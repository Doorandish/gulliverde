import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 3000, proxy: { '/api': 'http://localhost:5000', '/sitemap': 'http://localhost:5000', '/robots.txt': 'http://localhost:5000' } },
  build: { sourcemap: false, minify: true },
})
