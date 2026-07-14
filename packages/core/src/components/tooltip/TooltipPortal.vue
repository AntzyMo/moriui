<script setup lang="ts">
  import type { TooltipPortalProps } from 'reka-ui'

  import { TooltipPortal, useForwardProps } from 'reka-ui'

  const props = defineProps<TooltipPortalProps>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <TooltipPortal v-bind="forwarded">
    <slot />
  </TooltipPortal>
</template>
