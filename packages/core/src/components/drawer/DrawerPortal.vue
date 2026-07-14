<script setup lang="ts">
  import type { DrawerPortalProps } from 'reka-ui'

  import { DrawerPortal } from 'reka-ui'

  const props = defineProps<DrawerPortalProps>()
</script>

<template>
  <DrawerPortal v-bind="props" data-slot="drawer-portal">
    <slot />
  </DrawerPortal>
</template>
