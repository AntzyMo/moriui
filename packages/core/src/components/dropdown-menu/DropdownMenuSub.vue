<script setup lang="ts">
  import type { DropdownMenuSubEmits, DropdownMenuSubProps } from 'reka-ui'

  import { DropdownMenuSub, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<DropdownMenuSubProps>()
  const emit = defineEmits<DropdownMenuSubEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuSub
    #default="slotProps"
    v-bind="forwarded"
    data-slot="dropdown-menu-sub"
  >
    <slot v-bind="slotProps" />
  </DropdownMenuSub>
</template>
