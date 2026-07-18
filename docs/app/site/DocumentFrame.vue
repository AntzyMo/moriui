<script setup lang="ts">
  import type { TocItem } from '~/documentation/toc'

  import OnThisPage from './OnThisPage.vue'
  import DocumentSidebar from './DocumentSidebar.vue'
  import {
    Button,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from 'moriui'

  const props = withDefaults(defineProps<{
    toc?: readonly TocItem[]
  }>(), {
    toc: () => []
  })
</script>

<template>
  <div class="border-b border-border px-4 py-2 lg:hidden">
    <Sheet>
      <SheetTrigger as-child>
        <Button size="sm" type="button" variant="ghost">
          打开导航
        </Button>
      </SheetTrigger>
      <SheetContent class="overflow-y-auto" side="left">
        <SheetHeader>
          <SheetTitle>文档导航</SheetTitle>
          <SheetDescription>浏览指南与全部 MoriUI 组件。</SheetDescription>
        </SheetHeader>
        <div class="mt-6">
          <DocumentSidebar />
        </div>
      </SheetContent>
    </Sheet>
  </div>

  <div class="mx-auto grid max-w-[1360px] gap-8 px-4 py-8 lg:grid-cols-[14rem_minmax(0,46rem)] lg:px-6 xl:grid-cols-[14rem_minmax(0,46rem)_12rem]">
    <aside class="sticky top-28 hidden h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <DocumentSidebar />
    </aside>
    <main class="min-w-0">
      <slot />
    </main>
    <OnThisPage :items="props.toc" />
  </div>
</template>
