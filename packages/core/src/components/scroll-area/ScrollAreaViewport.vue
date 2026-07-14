<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ScrollAreaViewportProps } from 'reka-ui'

  import { scrollAreaVariants } from './variants'
  import { ScrollAreaViewport, useForwardProps } from 'reka-ui'

  interface Props extends ScrollAreaViewportProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = scrollAreaVariants()
</script>

<template>
  <ScrollAreaViewport
    v-bind="forwarded"
    :class="slots.viewport({ class: props.class as never })"
    data-slot="scroll-area-viewport"
  >
    <slot />
  </ScrollAreaViewport>
</template>
