<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarGroupProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarGroup, useForwardProps } from 'reka-ui'

  interface Props extends MenubarGroupProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarGroup
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="menubar-group"
  >
    <slot />
  </MenubarGroup>
</template>
