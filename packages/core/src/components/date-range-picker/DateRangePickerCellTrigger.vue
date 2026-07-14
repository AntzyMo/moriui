<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerCellTriggerProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerCellTrigger, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerCellTriggerProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerCellTrigger
    #default="slotProps"
    v-bind="forwarded"
    :class="dateRangePickerVariants().cellTrigger({ class: props.class as never })"
    data-slot="date-range-picker-cell-trigger"
  >
    <slot v-bind="slotProps" />
  </DateRangePickerCellTrigger>
</template>
