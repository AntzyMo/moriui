<script setup lang="ts">
  import SiteHeader from '~/site/SiteHeader.vue'
  import DocumentFrame from '~/site/DocumentFrame.vue'

  import { catalogToc } from '~/documentation/toc'
  import ComponentCatalog from '~/components/ComponentCatalog.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader mode="docs" />
    <DocumentFrame :toc="catalogToc">
      <ComponentCatalog />
    </DocumentFrame>
  </div>
</template>
