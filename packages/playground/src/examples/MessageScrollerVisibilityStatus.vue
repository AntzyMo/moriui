<script setup lang="ts">
  import { computed } from 'vue'
  import { useMessageScrollerVisibility } from 'moriui'

  const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()
  const visibleLabel = computed(() => visibleMessageIds.value.length ? visibleMessageIds.value.join('、') : '无')
</script>

<template>
  <output class="playground__example-label">
    当前锚点：{{ currentAnchorId ?? '无' }}；可见消息：{{ visibleLabel }}
  </output>
</template>
