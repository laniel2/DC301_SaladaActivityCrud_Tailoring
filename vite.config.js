import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '.vscode',
    emptyOutDir: true
  },
  publicDir: 'public'
})