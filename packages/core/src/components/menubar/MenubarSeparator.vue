<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarSeparatorProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarSeparator, useForwardProps } from 'reka-ui'

  interface Props extends MenubarSeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarSeparator
    v-bind="forwarded"
    :class="slots.separator({ class: props.class as never })"
    data-slot="menubar-separator"
  />
</template>
