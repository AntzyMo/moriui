<script setup lang="ts">
  import SiteHeader from '~/site/SiteHeader.vue'
  import DocumentFrame from '~/site/DocumentFrame.vue'
  import DocumentArticle from '~/site/DocumentArticle.vue'

  import { resolveComponentRoute } from '~/documentation/component-route'
  import { getComponent } from '~/documentation/registry'

  definePageMeta({ key: route => route.path })

  const route = useRoute()
  const contentPath = `/docs/components/${route.params.slug as string}`
  const { data: contentPage } = await useAsyncData(
    () => `component-content-${contentPath}`,
    () => queryCollection('content').path(contentPath).first()
  )

  const routeDecision = resolveComponentRoute({
    slug: route.params.slug as string,
    contentPage: contentPage.value,
    getComponent,
    createNotFound: () => {
      throw createError({ statusCode: 404, statusMessage: '页面不存在', fatal: true })
    }
  })

  const toc = routeDecision.toc
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader mode="docs" />
    <DocumentFrame :toc="toc">
      <DocumentArticle>
        <ContentRenderer :value="routeDecision.contentPage" />
      </DocumentArticle>
    </DocumentFrame>
  </div>
</template>
