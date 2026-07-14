<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerGridRowProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerGridRow, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerGridRowProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerGridRow v-bind="forwarded" :class="dateRangePickerVariants().gridRow({ class: props.class as never })" data-slot="date-range-picker-grid-row">
    <slot />
  </DateRangePickerGridRow>
</template>
