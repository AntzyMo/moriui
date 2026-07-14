<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerGridProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerGrid, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerGridProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerGrid v-bind="forwarded" :class="dateRangePickerVariants().grid({ class: props.class as never })" data-slot="date-range-picker-grid">
    <slot />
  </DateRangePickerGrid>
</template>
