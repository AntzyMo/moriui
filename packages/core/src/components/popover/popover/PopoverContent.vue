<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PopoverContentProps } from 'reka-ui'

import { popoverVariants } from './variants'
import { PopoverContent, PopoverPortal, useForwardProps } from 'reka-ui'

interface Props extends PopoverContentProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  sideOffset: 4,
})
const forwarded = useForwardProps(props)
const slots = popoverVariants()
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="forwarded"
      :class="slots.content({ class: props.class as never })"
      data-slot="popover-content"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
