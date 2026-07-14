<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuIndicatorProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { NavigationMenuIndicator, useForwardProps } from 'reka-ui'

  interface Props extends NavigationMenuIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuIndicator
    v-bind="forwarded"
    :class="slots.indicator({ class: props.class as never })"
    data-slot="navigation-menu-indicator"
  >
    <slot>
      <span :class="slots.indicatorMark()" data-slot="navigation-menu-indicator-mark" />
    </slot>
  </NavigationMenuIndicator>
</template>
