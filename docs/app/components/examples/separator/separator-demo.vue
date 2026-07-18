<script setup lang="ts">
  import { Separator } from 'moriui'
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="space-y-1">
      <h4 class="text-sm font-medium">
        MoriUI
      </h4><p class="text-sm text-muted-foreground">
        Vue 组件库
      </p>
    </div><Separator class="my-4" /><div class="flex h-5 items-center gap-4 text-sm">
      <span>文档</span><Separator orientation="vertical" /><span>组件</span><Separator orientation="vertical" /><span>主题</span>
    </div>
  </div>
</template>
