<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuArrowProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuArrow, useForwardProps } from 'reka-ui'

  interface Props extends ContextMenuArrowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuArrow
    v-bind="forwarded"
    :class="slots.arrow({ class: props.class as never })"
    data-slot="context-menu-arrow"
  >
    <slot />
  </ContextMenuArrow>
</template>
