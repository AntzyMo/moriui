<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerHeadCellProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerHeadCell, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerHeadCellProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerHeadCell v-bind="forwarded" :class="datePickerVariants().headCell({ class: props.class as never })" data-slot="date-picker-head-cell">
    <slot />
  </DatePickerHeadCell>
</template>
