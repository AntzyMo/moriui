import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
  plugins: lazyPlugins(() => [tailwindcss(), vue()])
})
