<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerInputProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerInput, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerInputProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerInput
    v-slot="slotProps"
    v-bind="forwarded"
    :class="dateRangePickerVariants().input({ class: props.class as never })"
    data-slot="date-range-picker-input"
  >
    <slot v-bind="slotProps" />
  </DateRangePickerInput>
</template>
