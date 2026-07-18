import tailwindcss from '@tailwindcss/vite'
import { staticRoutes } from './app/documentation/routes'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/a11y', '@nuxt/hints', '@nuxt/image'],
  components: [{ path: '~/components', ignore: ['examples/**'] }],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  nitro: {
    prerender: {
      routes: staticRoutes,
      crawlLinks: true,
      failOnError: true
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
})
