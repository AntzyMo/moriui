<script setup lang="ts">
  import type { HoverCardPortalProps } from 'reka-ui'

  import { HoverCardPortal, useForwardProps } from 'reka-ui'

  const props = defineProps<HoverCardPortalProps>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <HoverCardPortal v-bind="forwarded">
    <slot />
  </HoverCardPortal>
</template>
