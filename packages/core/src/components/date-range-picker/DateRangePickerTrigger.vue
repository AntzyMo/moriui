<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerTriggerProps } from 'reka-ui'

  import { CalendarDays } from '@lucide/vue'
  import { DateRangePickerTrigger, useForwardProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'

  interface Props extends DateRangePickerTriggerProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerTrigger v-bind="forwarded" :class="dateRangePickerVariants().trigger({ class: props.class as never })" data-slot="date-range-picker-trigger">
    <slot>
      <CalendarDays :class="dateRangePickerVariants().triggerIcon()" aria-hidden="true" data-slot="date-range-picker-trigger-icon" />
    </slot>
  </DateRangePickerTrigger>
</template>
