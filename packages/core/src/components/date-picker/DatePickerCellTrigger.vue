<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerCellTriggerProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerCellTrigger, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerCellTriggerProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerCellTrigger
    #default="slotProps"
    v-bind="forwarded"
    :class="datePickerVariants().cellTrigger({ class: props.class as never })"
    data-slot="date-picker-cell-trigger"
  >
    <slot v-bind="slotProps" />
  </DatePickerCellTrigger>
</template>
