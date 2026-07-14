<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerOverlayProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { DrawerOverlay, injectDrawerRootContext, useForwardProps } from 'reka-ui'

  interface Props extends DrawerOverlayProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const rootContext = injectDrawerRootContext()
  const slots = drawerVariants()
</script>

<template>
  <DrawerOverlay
    v-bind="forwarded"
    :class="slots.overlay({ class: props.class as never })"
    :data-snap-points="rootContext.snapPoints.value?.length ? '' : undefined"
    data-slot="drawer-overlay"
  />
</template>
