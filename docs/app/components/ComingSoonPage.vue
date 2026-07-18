<script setup lang="ts">
  import type { ComponentRecord } from '~/documentation/registry'

  import { Badge, Button } from 'moriui'

  defineProps<{
    component: ComponentRecord
  }>()
</script>

<template>
  <article class="grid max-w-2xl gap-6 pb-12">
    <div>
      <Badge variant="secondary">
        即将推出
      </Badge>
    </div>
    <div class="grid gap-3">
      <h1 class="text-4xl font-semibold tracking-tight">
        {{ component.title }}
      </h1>
      <p class="text-lg leading-8 text-muted-foreground">
        {{ component.summary }}完整示例、变体和 API 资料正在整理中。
      </p>
    </div>
    <Button as-child class="w-fit" variant="secondary">
      <NuxtLink to="/docs/components">
        返回全部组件
      </NuxtLink>
    </Button>
  </article>
</template>
