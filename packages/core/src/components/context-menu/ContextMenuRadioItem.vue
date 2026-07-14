<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
  import ContextMenuItemIndicator from './ContextMenuItemIndicator.vue'

  interface Props extends ContextMenuRadioItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<ContextMenuRadioItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuRadioItem
    v-bind="forwarded"
    :class="slots.radioItem({ class: props.class as never })"
    data-slot="context-menu-radio-item"
  >
    <ContextMenuItemIndicator>
      <slot name="indicator">
        <span
          :class="slots.itemIndicatorMark()"
          aria-hidden="true"
          data-slot="context-menu-radio-item-mark"
        />
      </slot>
    </ContextMenuItemIndicator>
    <slot />
  </ContextMenuRadioItem>
</template>
