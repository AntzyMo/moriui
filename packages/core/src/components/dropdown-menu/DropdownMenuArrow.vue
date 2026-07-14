<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuArrowProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuArrow, useForwardProps } from 'reka-ui'

  interface Props extends DropdownMenuArrowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuArrow
    v-bind="forwarded"
    :class="slots.arrow({ class: props.class as never })"
    data-slot="dropdown-menu-arrow"
  >
    <slot />
  </DropdownMenuArrow>
</template>
