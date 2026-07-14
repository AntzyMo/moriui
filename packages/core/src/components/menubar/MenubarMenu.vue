<script setup lang="ts">
  import type { MenubarMenuProps } from 'reka-ui'

  import { MenubarMenu, useForwardProps } from 'reka-ui'

  const props = defineProps<MenubarMenuProps>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <MenubarMenu
    #default="slotProps"
    v-bind="forwarded"
    data-slot="menubar-menu"
  >
    <slot v-bind="slotProps" />
  </MenubarMenu>
</template>
