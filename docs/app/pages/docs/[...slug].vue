<script setup lang="ts">
  import SiteHeader from '~/site/SiteHeader.vue'
  import DocumentFrame from '~/site/DocumentFrame.vue'

  import { getGuidePage } from '~/documentation/toc'

  definePageMeta({ key: route => route.path })

  const route = useRoute()
  const guide = getGuidePage(route.path)

  if (!guide) {
    throw createError({ statusCode: 404, statusMessage: '页面不存在', fatal: true })
  }

  const { data: page } = await useAsyncData(
    () => `content-${route.path}`,
    () => queryCollection('content').path(route.path).first()
  )

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: '页面不存在', fatal: true })
  }
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader mode="docs" />
    <DocumentFrame :toc="guide.toc">
      <article class="max-w-none text-foreground [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-32 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:my-2 [&_p]:my-4 [&_p]:leading-7 [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted/60 [&_pre]:p-4">
        <ContentRenderer v-if="page" :value="page" />
      </article>
    </DocumentFrame>
  </div>
</template>
