<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerTitleProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { DrawerTitle, useForwardProps } from 'reka-ui'

  interface Props extends DrawerTitleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = drawerVariants()
</script>

<template>
  <DrawerTitle
    v-bind="forwarded"
    :class="slots.title({ class: props.class as never })"
    data-slot="drawer-title"
  >
    <slot />
  </DrawerTitle>
</template>
