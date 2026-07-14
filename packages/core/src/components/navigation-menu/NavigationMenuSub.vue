<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuSubProps } from 'reka-ui'

  import { provide, shallowRef } from 'vue'
  import { NavigationMenuSub, useForwardProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { navigationMenuAutoViewportKey } from './context'

  interface Props extends Omit<NavigationMenuSubProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<string>()
  provide(navigationMenuAutoViewportKey, shallowRef(false))
  const forwarded = useForwardProps(props)
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuSub
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.sub({ class: props.class as never })"
    data-slot="navigation-menu-sub"
  >
    <slot v-bind="slotProps" />
  </NavigationMenuSub>
</template>
