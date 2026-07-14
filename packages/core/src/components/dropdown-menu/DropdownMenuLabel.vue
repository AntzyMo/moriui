<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuLabelProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuLabel, useForwardProps } from 'reka-ui'

  interface Props extends DropdownMenuLabelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwarded"
    :class="slots.label({ class: props.class as never })"
    data-slot="dropdown-menu-label"
  >
    <slot />
  </DropdownMenuLabel>
</template>
