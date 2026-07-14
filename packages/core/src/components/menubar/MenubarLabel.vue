<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarLabelProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarLabel, useForwardProps } from 'reka-ui'

  interface Props extends MenubarLabelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarLabel
    v-bind="forwarded"
    :class="slots.label({ class: props.class as never })"
    data-slot="menubar-label"
  >
    <slot />
  </MenubarLabel>
</template>
