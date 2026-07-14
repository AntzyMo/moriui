<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends DropdownMenuItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<DropdownMenuItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :class="slots.item({ class: props.class as never })"
    data-slot="dropdown-menu-item"
  >
    <slot />
  </DropdownMenuItem>
</template>
