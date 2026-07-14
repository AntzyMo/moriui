<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuLabelProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuLabel, useForwardProps } from 'reka-ui'

  interface Props extends ContextMenuLabelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuLabel
    v-bind="forwarded"
    :class="slots.label({ class: props.class as never })"
    data-slot="context-menu-label"
  >
    <slot />
  </ContextMenuLabel>
</template>
