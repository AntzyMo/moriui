<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'moriui'

  const isOpen = shallowRef(false)
</script>

<template>
  <Collapsible v-model:open="isOpen" class="w-full max-w-sm">
    <CollapsibleTrigger class="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted/50">
      <span>了解更多</span>
      <span aria-hidden="true" class="text-muted-foreground">{{ isOpen ? '−' : '+' }}</span>
    </CollapsibleTrigger>
    <CollapsibleContent class="mt-2 rounded-md border px-4 py-3 text-sm text-muted-foreground">
      Collapsible 是一个可折叠的内容容器，用于隐藏和显示额外信息。点击触发按钮可切换内容区域的可见性。
    </CollapsibleContent>
  </Collapsible>
</template>
