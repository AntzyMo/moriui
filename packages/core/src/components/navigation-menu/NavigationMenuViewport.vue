<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuViewportProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { NavigationMenuViewport, useForwardProps } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), {
    align: 'start'
  })

  interface Props extends NavigationMenuViewportProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardProps(props)
  const slots = navigationMenuVariants()
</script>

<template>
  <div :class="slots.viewportWrapper()" data-slot="navigation-menu-viewport-wrapper">
    <NavigationMenuViewport
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.viewport({ class: props.class as never })"
      data-slot="navigation-menu-viewport"
    >
      <slot />
    </NavigationMenuViewport>
  </div>
</template>
