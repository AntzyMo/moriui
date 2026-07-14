<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TooltipArrowProps } from 'reka-ui'

  import { tooltipVariants } from './variants'
  import { TooltipArrow, useForwardProps } from 'reka-ui'

  interface Props extends TooltipArrowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = tooltipVariants()
</script>

<template>
  <TooltipArrow
    v-bind="forwarded"
    :class="slots.arrow({ class: props.class as never })"
    data-slot="tooltip-arrow"
  >
    <slot />
  </TooltipArrow>
</template>
