import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Proyecto-3.3-SPA-/', // <- importante para GitHub Pages
  plugins: [vue()],
  server: {
    port: 5173,       
    open: true  
  }
})
