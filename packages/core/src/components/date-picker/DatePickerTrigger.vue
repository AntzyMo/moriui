<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerTriggerProps } from 'reka-ui'

  import { CalendarDays } from '@lucide/vue'
  import { DatePickerTrigger, useForwardProps } from 'reka-ui'

  import { datePickerVariants } from './variants'

  interface Props extends DatePickerTriggerProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerTrigger v-bind="forwarded" :class="datePickerVariants().trigger({ class: props.class as never })" data-slot="date-picker-trigger">
    <slot>
      <CalendarDays :class="datePickerVariants().triggerIcon()" aria-hidden="true" data-slot="date-picker-trigger-icon" />
    </slot>
  </DatePickerTrigger>
</template>
