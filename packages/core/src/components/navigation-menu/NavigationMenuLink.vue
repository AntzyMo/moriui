<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { NavigationMenuLink, useForwardPropsEmits } from 'reka-ui'

  interface Props extends NavigationMenuLinkProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<NavigationMenuLinkEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = navigationMenuVariants()
</script>

<template>
  <NavigationMenuLink
    v-bind="forwarded"
    :class="slots.link({ class: props.class as never })"
    data-slot="navigation-menu-link"
  >
    <slot />
  </NavigationMenuLink>
</template>
