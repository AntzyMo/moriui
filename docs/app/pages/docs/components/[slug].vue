<script setup lang="ts">
  import type { PublishedComponentRecord } from '~/documentation/registry'

  import ComingSoonPage from '~/components/ComingSoonPage.vue'
  import ComponentReference from '~/components/ComponentReference.vue'

  import SiteHeader from '~/site/SiteHeader.vue'
  import DocumentFrame from '~/site/DocumentFrame.vue'

  import { getReferenceToc } from '~/documentation/toc'
  import {
    assertPublishedReference,
    getComponent

  } from '~/documentation/registry'

  definePageMeta({ key: route => route.path })

  const route = useRoute()
  const component = getComponent(route.params.slug as string)

  if (!component) {
    throw createError({ statusCode: 404, statusMessage: '页面不存在', fatal: true })
  }

  let publishedComponent: PublishedComponentRecord | undefined
  if (component.status === 'published') {
    assertPublishedReference(component)
    publishedComponent = component
  }

  const toc = publishedComponent ? getReferenceToc(publishedComponent) : []
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader mode="docs" />
    <DocumentFrame :toc="toc">
      <ComponentReference v-if="publishedComponent" :component="publishedComponent" />
      <ComingSoonPage v-else :component="component" />
    </DocumentFrame>
  </div>
</template>
