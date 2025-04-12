import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


export default defineConfig({
  server: {
  host: '192.168.1.72',  
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173 
    }
  },
  plugins: [
    [vue()],
    [vueDevTools()],
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
