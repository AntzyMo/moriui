<script setup lang="ts">
  import type { Direction } from 'reka-ui'

  import { computed } from 'vue'
  import { ConfigProvider } from 'reka-ui'

  export interface DirectionProviderProps {
    dir?: Direction
    direction?: Direction
  }

  const props = defineProps<DirectionProviderProps>()
  const resolvedDirection = computed<Direction>(() => props.direction ?? props.dir ?? 'ltr')
</script>

<template>
  <ConfigProvider :dir="resolvedDirection">
    <slot />
  </ConfigProvider>
</template>
