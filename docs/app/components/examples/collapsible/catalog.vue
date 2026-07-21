<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'moriui'

  const open = shallowRef(false)
</script>

<template>
  <Collapsible v-model:open="open">
    <CollapsibleTrigger>展开更多</CollapsibleTrigger><CollapsibleContent>这里是可折叠的内容区域，点击触发按钮可切换显示。</CollapsibleContent>
  </Collapsible>
</template>
