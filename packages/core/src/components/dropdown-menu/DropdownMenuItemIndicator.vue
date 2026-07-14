<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuItemIndicatorProps } from 'reka-ui'

  import { Check } from '@lucide/vue'
  import { DropdownMenuItemIndicator, useForwardProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'

  interface Props extends DropdownMenuItemIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuItemIndicator
    v-bind="forwarded"
    :class="slots.itemIndicator({ class: props.class as never })"
    data-slot="dropdown-menu-item-indicator"
  >
    <slot>
      <Check
        :class="slots.itemIndicatorMark()"
        aria-hidden="true"
        data-slot="dropdown-menu-item-indicator-mark"
      />
    </slot>
  </DropdownMenuItemIndicator>
</template>
