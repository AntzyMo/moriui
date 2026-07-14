<script setup lang="ts">
  import type { DrawerRootEmits, DrawerRootProps } from 'reka-ui'

  import { DrawerRoot, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<DrawerRootProps>()
  const emits = defineEmits<DrawerRootEmits>()
  const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot
    #default="slotProps"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
