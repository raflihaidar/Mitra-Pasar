import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression'
import commonjs from 'vite-plugin-commonjs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), commonjs(), viteCompression()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
