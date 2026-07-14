<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import ContextMenuItemIndicator from './ContextMenuItemIndicator.vue'
  import { ContextMenuCheckboxItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends ContextMenuCheckboxItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<ContextMenuCheckboxItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuCheckboxItem
    v-bind="forwarded"
    :class="slots.checkboxItem({ class: props.class as never })"
    data-slot="context-menu-checkbox-item"
  >
    <ContextMenuItemIndicator>
      <slot name="indicator">
        <span
          :class="slots.itemIndicatorMark()"
          aria-hidden="true"
          data-slot="context-menu-checkbox-item-mark"
        />
      </slot>
    </ContextMenuItemIndicator>
    <slot />
  </ContextMenuCheckboxItem>
</template>
