import { defineConfig } from 'tsdown'
import vue from 'unplugin-vue/rolldown'

export default defineConfig({
  platform: 'neutral',
  format: ['esm'],
  exports: {
    devExports: true
  },
  plugins: [vue()],
  dts: { vue: true },
  css: {
    fileName: 'style.css'
  }
})
