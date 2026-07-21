import { defineConfig, lazyPlugins } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'

import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import rolldownVue from 'unplugin-vue/rolldown'

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
      devExports: true,
      customExports(exports, { isPublish }) {
        exports['./style.css'] = isPublish
          ? './dist/style.css'
          : './src/styles/index.css'

        return exports
      }
    },
    plugins: [rolldownVue()],
    dts: { vue: true }
  }
})
