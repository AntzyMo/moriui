<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuTriggerProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { NavigationMenuTrigger, useForwardProps } from 'reka-ui'

  interface Props extends NavigationMenuTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="navigation-menu-trigger"
  >
    <slot />
  </NavigationMenuTrigger>
</template>
