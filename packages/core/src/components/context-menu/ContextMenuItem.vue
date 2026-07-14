<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuItemEmits, ContextMenuItemProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends ContextMenuItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<ContextMenuItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuItem
    v-bind="forwarded"
    :class="slots.item({ class: props.class as never })"
    data-slot="context-menu-item"
  >
    <slot />
  </ContextMenuItem>
</template>
