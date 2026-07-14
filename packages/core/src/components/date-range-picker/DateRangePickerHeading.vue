<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerHeadingProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerHeading, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerHeadingProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerHeading
    #default="slotProps"
    v-bind="forwarded"
    :class="dateRangePickerVariants().heading({ class: props.class as never })"
    data-slot="date-range-picker-heading"
  >
    <slot v-bind="slotProps" />
  </DateRangePickerHeading>
</template>
