<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerCellProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerCell, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerCellProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerCell v-bind="forwarded" :class="datePickerVariants().cell({ class: props.class as never })" data-slot="date-picker-cell">
    <slot />
  </DatePickerCell>
</template>
