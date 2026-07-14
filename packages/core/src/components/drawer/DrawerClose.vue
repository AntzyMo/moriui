<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerCloseProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { DrawerClose, useForwardProps } from 'reka-ui'

  interface Props extends DrawerCloseProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = drawerVariants()
</script>

<template>
  <DrawerClose
    v-bind="forwarded"
    :class="slots.close({ class: props.class as never })"
    data-slot="drawer-close"
  >
    <slot />
  </DrawerClose>
</template>
