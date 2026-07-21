<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PopoverTriggerProps } from 'reka-ui'

  import { popoverVariants } from './variants'
  import { PopoverTrigger, useForwardProps } from 'reka-ui'

  interface Props extends PopoverTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = popoverVariants()
</script>

<template>
  <PopoverTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="popover-trigger"
  >
    <slot />
  </PopoverTrigger>
</template>
