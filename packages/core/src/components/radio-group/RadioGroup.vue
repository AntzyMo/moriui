<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, RadioGroupRootProps } from 'reka-ui'

  import { radioGroupVariants } from './variants'
  import { RadioGroupRoot, useForwardProps } from 'reka-ui'

  interface Props extends Omit<RadioGroupRootProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<AcceptableValue>()
  const forwarded = useForwardProps(props)
  const slots = radioGroupVariants()
</script>

<template>
  <RadioGroupRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    data-slot="radio-group"
  >
    <slot v-bind="slotProps" />
  </RadioGroupRoot>
</template>
