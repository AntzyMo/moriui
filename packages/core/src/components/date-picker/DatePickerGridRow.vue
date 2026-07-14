<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerGridRowProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerGridRow, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerGridRowProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerGridRow v-bind="forwarded" :class="datePickerVariants().gridRow({ class: props.class as never })" data-slot="date-picker-grid-row">
    <slot />
  </DatePickerGridRow>
</template>
