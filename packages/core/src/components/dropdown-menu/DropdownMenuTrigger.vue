<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuTriggerProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuTrigger, useForwardProps } from 'reka-ui'

  interface Props extends DropdownMenuTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="dropdown-menu-trigger"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
