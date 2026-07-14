<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerDescriptionProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { DrawerDescription, useForwardProps } from 'reka-ui'

  interface Props extends DrawerDescriptionProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = drawerVariants()
</script>

<template>
  <DrawerDescription
    v-bind="forwarded"
    :class="slots.description({ class: props.class as never })"
    data-slot="drawer-description"
  >
    <slot />
  </DrawerDescription>
</template>
