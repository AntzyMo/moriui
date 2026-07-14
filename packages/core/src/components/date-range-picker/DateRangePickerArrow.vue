<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerArrowProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerArrow, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerArrowProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerArrow v-bind="forwarded" :class="dateRangePickerVariants().arrow({ class: props.class as never })" data-slot="date-range-picker-arrow" />
</template>
