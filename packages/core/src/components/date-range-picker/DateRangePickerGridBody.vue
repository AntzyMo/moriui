<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerGridBodyProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerGridBody, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerGridBodyProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerGridBody v-bind="forwarded" :class="dateRangePickerVariants().gridBody({ class: props.class as never })" data-slot="date-range-picker-grid-body">
    <slot />
  </DateRangePickerGridBody>
</template>
