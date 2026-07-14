<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'

  import { tooltipVariants } from './variants'
  import { TooltipContent, useForwardPropsEmits } from 'reka-ui'

  interface Props extends TooltipContentProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    sideOffset: 4
  })
  const emits = defineEmits<TooltipContentEmits>()
  const forwarded = useForwardPropsEmits(props, emits)
  const slots = tooltipVariants()
</script>

<template>
  <TooltipContent
    v-bind="forwarded"
    :class="slots.content({ class: props.class as never })"
    data-slot="tooltip-content"
  >
    <slot />
  </TooltipContent>
</template>
