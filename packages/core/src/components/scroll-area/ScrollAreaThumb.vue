<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ScrollAreaThumbProps } from 'reka-ui'

  import { scrollAreaVariants } from './variants'
  import { ScrollAreaThumb, useForwardProps } from 'reka-ui'

  interface Props extends ScrollAreaThumbProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = scrollAreaVariants()
</script>

<template>
  <ScrollAreaThumb
    v-bind="forwarded"
    :class="slots.thumb({ class: props.class as never })"
    data-slot="scroll-area-thumb"
  >
    <slot />
  </ScrollAreaThumb>
</template>
