<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ScrollAreaCornerProps } from 'reka-ui'

  import { scrollAreaVariants } from './variants'
  import { ScrollAreaCorner, useForwardProps } from 'reka-ui'

  interface Props extends ScrollAreaCornerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = scrollAreaVariants()
</script>

<template>
  <ScrollAreaCorner
    v-bind="forwarded"
    :class="slots.corner({ class: props.class as never })"
    data-slot="scroll-area-corner"
  >
    <slot />
  </ScrollAreaCorner>
</template>
