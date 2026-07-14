<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SliderRootProps } from 'reka-ui'

  import { sliderVariants } from './variants'
  import { SliderRoot, useForwardProps } from 'reka-ui'

  export interface SliderProps extends Omit<SliderRootProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<SliderProps>()
  const modelValue = defineModel<number[] | null>()
  const forwarded = useForwardProps(props)
  const slots = sliderVariants()
</script>

<template>
  <SliderRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    data-slot="slider"
  >
    <slot v-bind="slotProps" />
  </SliderRoot>
</template>
