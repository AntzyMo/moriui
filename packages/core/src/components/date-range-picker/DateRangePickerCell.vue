<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerCellProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerCell, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerCellProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerCell v-bind="forwarded" :class="dateRangePickerVariants().cell({ class: props.class as never })" data-slot="date-range-picker-cell">
    <slot />
  </DateRangePickerCell>
</template>
