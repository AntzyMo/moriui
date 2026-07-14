<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SliderThumbProps } from 'reka-ui'

  import { sliderVariants } from './variants'
  import { SliderThumb, useForwardProps } from 'reka-ui'

  interface Props extends SliderThumbProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = sliderVariants()
</script>

<template>
  <SliderThumb
    v-bind="forwarded"
    :class="slots.thumb({ class: props.class as never })"
    data-slot="slider-thumb"
  >
    <slot />
  </SliderThumb>
</template>
