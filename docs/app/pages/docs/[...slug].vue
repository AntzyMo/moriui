<script setup lang="ts">
  import SiteHeader from '~/site/SiteHeader.vue'
  import DocumentFrame from '~/site/DocumentFrame.vue'
  import DocumentArticle from '~/site/DocumentArticle.vue'

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
      <DocumentArticle>
        <ContentRenderer v-if="page" :value="page" />
      </DocumentArticle>
    </DocumentFrame>
  </div>
</template>
