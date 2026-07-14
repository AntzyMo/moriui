<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarItemEmits, MenubarItemProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends MenubarItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<MenubarItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = menubarVariants()
</script>

<template>
  <MenubarItem
    v-bind="forwarded"
    :class="slots.item({ class: props.class as never })"
    data-slot="menubar-item"
  >
    <slot />
  </MenubarItem>
</template>
