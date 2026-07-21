<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PopoverAnchorProps } from 'reka-ui'

  import { popoverVariants } from './variants'
  import { PopoverAnchor, useForwardProps } from 'reka-ui'

  interface Props extends PopoverAnchorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = popoverVariants()
</script>

<template>
  <PopoverAnchor
    v-bind="forwarded"
    :class="slots.anchor({ class: props.class as never })"
    data-slot="popover-anchor"
  >
    <slot />
  </PopoverAnchor>
</template>
