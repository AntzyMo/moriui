<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, RadioGroupItemEmits, RadioGroupItemProps } from 'reka-ui'

  import { Dot } from '@lucide/vue'
  import { RadioGroupIndicator, RadioGroupItem, useForwardPropsEmits } from 'reka-ui'

  import { radioGroupVariants } from './variants'

  interface Props extends RadioGroupItemProps {
    value: AcceptableValue
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<RadioGroupItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = radioGroupVariants()
</script>

<template>
  <RadioGroupItem
    v-slot="slotProps"
    v-bind="forwarded"
    :class="slots.item({ class: props.class as never })"
    data-slot="radio-group-item"
  >
    <RadioGroupIndicator
      :class="slots.indicator()"
      data-slot="radio-group-indicator"
    >
      <slot v-bind="slotProps">
        <Dot
          :class="slots.indicatorMark()"
          aria-hidden="true"
          data-slot="radio-group-indicator-mark"
          :stroke-width="18"
        />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
