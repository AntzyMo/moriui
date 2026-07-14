<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuTriggerProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuTrigger, useForwardProps } from 'reka-ui'

  interface Props extends ContextMenuTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="context-menu-trigger"
  >
    <slot />
  </ContextMenuTrigger>
</template>
