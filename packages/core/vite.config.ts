import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import rolldownVue from 'unplugin-vue/rolldown'
import { defineConfig, lazyPlugins } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'

export default defineConfig({
  plugins: lazyPlugins(() => [tailwindcss(), vue()]),
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true
    }
  },
  pack: {
    platform: 'neutral',
    format: ['esm'],
    exports: {
      devExports: true
    },
    plugins: [rolldownVue()],
    dts: { vue: true },
    css: {
      fileName: 'style.css'
    }
  }
})
