import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // '@' -> src, the alias shadcn/ui expects.
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    // Same-origin dev calls: the browser hits the Vite server, which forwards
    // /api/* to Spring Boot. No CORS needed.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
