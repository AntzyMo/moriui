<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuGroupProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuGroup, useForwardProps } from 'reka-ui'

  interface Props extends DropdownMenuGroupProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuGroup
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="dropdown-menu-group"
  >
    <slot />
  </DropdownMenuGroup>
</template>
