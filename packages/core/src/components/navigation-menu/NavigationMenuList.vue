<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuListProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { NavigationMenuList, useForwardProps } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  interface Props extends NavigationMenuListProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardProps(props)
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuList
    v-bind="{ ...$attrs, ...forwarded }"
    :class="slots.list({ class: props.class as never })"
    data-slot="navigation-menu-list"
  >
    <slot />
  </NavigationMenuList>
</template>
