<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerTriggerProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { DrawerTrigger, useForwardProps } from 'reka-ui'

  interface Props extends DrawerTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = drawerVariants()
</script>

<template>
  <DrawerTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="drawer-trigger"
  >
    <slot />
  </DrawerTrigger>
</template>
