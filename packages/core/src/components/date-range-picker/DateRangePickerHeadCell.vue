<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerHeadCellProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerHeadCell, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerHeadCellProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerHeadCell v-bind="forwarded" :class="dateRangePickerVariants().headCell({ class: props.class as never })" data-slot="date-range-picker-head-cell">
    <slot />
  </DateRangePickerHeadCell>
</template>
