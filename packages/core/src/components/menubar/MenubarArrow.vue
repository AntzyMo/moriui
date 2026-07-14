<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarArrowProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarArrow, useForwardProps } from 'reka-ui'

  interface Props extends MenubarArrowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarArrow
    v-bind="forwarded"
    :class="slots.arrow({ class: props.class as never })"
    data-slot="menubar-arrow"
  >
    <slot />
  </MenubarArrow>
</template>
