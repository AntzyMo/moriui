<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuSeparatorProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuSeparator, useForwardProps } from 'reka-ui'

  interface Props extends DropdownMenuSeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuSeparator
    v-bind="forwarded"
    :class="slots.separator({ class: props.class as never })"
    data-slot="dropdown-menu-separator"
  />
</template>
