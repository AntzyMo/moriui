<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerGridHeadProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerGridHead, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerGridHeadProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerGridHead v-bind="forwarded" :class="dateRangePickerVariants().gridHead({ class: props.class as never })" data-slot="date-range-picker-grid-head">
    <slot />
  </DateRangePickerGridHead>
</template>
