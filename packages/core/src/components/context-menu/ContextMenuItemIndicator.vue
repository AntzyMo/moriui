<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuItemIndicatorProps } from 'reka-ui'

  import { Check } from '@lucide/vue'
  import { ContextMenuItemIndicator, useForwardProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'

  interface Props extends ContextMenuItemIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuItemIndicator
    v-bind="forwarded"
    :class="slots.itemIndicator({ class: props.class as never })"
    data-slot="context-menu-item-indicator"
  >
    <slot>
      <Check
        :class="slots.itemIndicatorMark()"
        aria-hidden="true"
        data-slot="context-menu-item-indicator-mark"
      />
    </slot>
  </ContextMenuItemIndicator>
</template>
