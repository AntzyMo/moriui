<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarItemIndicatorProps } from 'reka-ui'

  import { Check } from '@lucide/vue'
  import { MenubarItemIndicator, useForwardProps } from 'reka-ui'

  import { menubarVariants } from './variants'

  interface Props extends MenubarItemIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarItemIndicator
    v-bind="forwarded"
    :class="slots.itemIndicator({ class: props.class as never })"
    data-slot="menubar-item-indicator"
  >
    <slot>
      <Check
        :class="slots.itemIndicatorMark()"
        aria-hidden="true"
        data-slot="menubar-item-indicator-mark"
      />
    </slot>
  </MenubarItemIndicator>
</template>
