<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuRootProps, NavigationMenuViewportProps } from 'reka-ui'

  import { provide, toRef } from 'vue'
  import { NavigationMenuRoot, useForwardProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { navigationMenuAutoViewportKey } from './context'
  import NavigationMenuViewport from './NavigationMenuViewport.vue'

  interface Props extends Omit<NavigationMenuRootProps, 'modelValue'> {
    align?: NavigationMenuViewportProps['align']
    class?: HTMLAttributes['class']
    viewport?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    align: 'start',
    viewport: true
  })
  const modelValue = defineModel<string>()
  provide(navigationMenuAutoViewportKey, toRef(props, 'viewport'))
  const forwarded = useForwardProps(() => {
    const { align: _align, viewport: _viewport, ...rekaProps } = props
    return rekaProps
  })
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    :data-viewport="String(props.viewport)"
    data-slot="navigation-menu"
  >
    <slot v-bind="slotProps" />
    <NavigationMenuViewport v-if="props.viewport" :align="props.align" />
  </NavigationMenuRoot>
</template>
