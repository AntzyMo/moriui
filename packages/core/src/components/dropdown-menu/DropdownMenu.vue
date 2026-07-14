<script setup lang="ts">
  import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'

  import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<DropdownMenuRootProps>()
  const emit = defineEmits<DropdownMenuRootEmits>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model:open="open"
    data-slot="dropdown-menu"
  >
    <slot v-bind="slotProps" />
  </DropdownMenuRoot>
</template>
