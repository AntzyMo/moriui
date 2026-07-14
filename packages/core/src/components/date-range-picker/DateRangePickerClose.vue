<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerCloseProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerClose, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerCloseProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerClose v-bind="forwarded" :class="dateRangePickerVariants().close({ class: props.class as never })" data-slot="date-range-picker-close">
    <slot />
  </DateRangePickerClose>
</template>
