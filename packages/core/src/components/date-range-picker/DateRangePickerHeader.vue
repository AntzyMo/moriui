<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerHeaderProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerHeader, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerHeaderProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerHeader v-bind="forwarded" :class="dateRangePickerVariants().header({ class: props.class as never })" data-slot="date-range-picker-header">
    <slot />
  </DateRangePickerHeader>
</template>
