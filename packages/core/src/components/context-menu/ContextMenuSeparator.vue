<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuSeparatorProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuSeparator, useForwardProps } from 'reka-ui'

  interface Props extends ContextMenuSeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuSeparator
    v-bind="forwarded"
    :class="slots.separator({ class: props.class as never })"
    data-slot="context-menu-separator"
  />
</template>
