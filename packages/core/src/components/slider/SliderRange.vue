<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SliderRangeProps } from 'reka-ui'

  import { sliderVariants } from './variants'
  import { SliderRange, useForwardProps } from 'reka-ui'

  interface Props extends SliderRangeProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = sliderVariants()
</script>

<template>
  <SliderRange
    v-bind="forwarded"
    :class="slots.range({ class: props.class as never })"
    data-slot="slider-range"
  >
    <slot />
  </SliderRange>
</template>
