<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import type { Component } from 'vue'

import CodeBlock from './CodeBlock.vue'

const props = withDefaults(defineProps<{
  name: string
  hideCode?: boolean
}>(), {
  hideCode: false,
})

const exampleModules = import.meta.glob<{ default: Component }>('../examples/**/*.vue')
const exampleSources = import.meta.glob('../examples/**/*.vue', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const resolvedPath = computed(() => {
  const matched = Object.keys(exampleModules).filter(p => p.endsWith(`/${props.name}.vue`))
  return matched.length > 0 ? matched[0] : null
})

const DemoComponent = computed(() => {
  const path = resolvedPath.value
  if (!path) return null
  return defineAsyncComponent(exampleModules[path])
})

const sourceCode = computed(() => {
  const path = resolvedPath.value
  if (!path) return ''
  return (exampleSources[path] ?? '') as string
})

const exampleNotFound = computed(() => !resolvedPath.value)
</script>

<template>
  <section class="grid gap-4">
    <div v-if="$slots.default" class="text-sm leading-6 text-muted-foreground">
      <slot />
    </div>

    <!-- 预览区域 -->
    <div
      v-if="exampleNotFound"
      class="grid min-h-44 place-items-center rounded-xl bg-red-50 p-6 text-sm text-red-600"
    >
      示例「{{ props.name }}」未找到
    </div>

    <div
      v-else-if="!DemoComponent"
      class="grid min-h-44 place-items-center rounded-xl bg-muted/35 p-6"
    >
      <div class="h-8 w-8 animate-pulse rounded-full bg-muted" />
    </div>

    <div
      v-else
      class="grid min-h-44 place-items-center rounded-xl bg-muted/35 p-6"
    >
      <ClientOnly>
        <component :is="DemoComponent" />
        <template #fallback>
          <div class="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </template>
      </ClientOnly>
    </div>

    <!-- 源码展示，复用 CodeBlock 保持与旧版一致 -->
    <CodeBlock v-if="!hideCode && sourceCode" :code="sourceCode" />
  </section>
</template>
