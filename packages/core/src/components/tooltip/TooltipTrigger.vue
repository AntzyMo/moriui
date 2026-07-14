<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TooltipTriggerProps } from 'reka-ui'

  import { tooltipVariants } from './variants'
  import { TooltipTrigger, useForwardProps } from 'reka-ui'

  interface Props extends TooltipTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = tooltipVariants()
</script>

<template>
  <TooltipTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="tooltip-trigger"
  >
    <slot />
  </TooltipTrigger>
</template>
