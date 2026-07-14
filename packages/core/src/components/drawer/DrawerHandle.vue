<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerHandleProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { DrawerHandle, useForwardProps } from 'reka-ui'

  interface Props extends DrawerHandleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = drawerVariants()
</script>

<template>
  <DrawerHandle
    v-bind="forwarded"
    :class="slots.handle({ class: props.class as never })"
    data-slot="drawer-handle"
  >
    <slot />
  </DrawerHandle>
</template>
