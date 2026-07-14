<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SliderTrackProps } from 'reka-ui'

  import { sliderVariants } from './variants'
  import { SliderTrack, useForwardProps } from 'reka-ui'

  interface Props extends SliderTrackProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = sliderVariants()
</script>

<template>
  <SliderTrack
    v-bind="forwarded"
    :class="slots.track({ class: props.class as never })"
    data-slot="slider-track"
  >
    <slot />
  </SliderTrack>
</template>
