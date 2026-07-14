<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuGroupProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuGroup, useForwardProps } from 'reka-ui'

  interface Props extends ContextMenuGroupProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuGroup
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="context-menu-group"
  >
    <slot />
  </ContextMenuGroup>
</template>
