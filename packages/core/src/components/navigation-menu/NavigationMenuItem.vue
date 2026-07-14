<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuItemProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { NavigationMenuItem, useForwardProps } from 'reka-ui'

  interface Props extends NavigationMenuItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuItem
    v-bind="forwarded"
    :class="slots.item({ class: props.class as never })"
    data-slot="navigation-menu-item"
  >
    <slot />
  </NavigationMenuItem>
</template>
