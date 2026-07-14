<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ScrollAreaScrollbarProps } from 'reka-ui'

  import { scrollAreaVariants } from './variants'
  import ScrollAreaThumb from './ScrollAreaThumb.vue'
  import { ScrollAreaScrollbar, useForwardProps } from 'reka-ui'

  interface Props extends ScrollAreaScrollbarProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = scrollAreaVariants()
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="forwarded"
    :class="slots.scrollbar({ class: props.class as never })"
    data-slot="scroll-area-scrollbar"
  >
    <slot>
      <ScrollAreaThumb />
    </slot>
  </ScrollAreaScrollbar>
</template>
