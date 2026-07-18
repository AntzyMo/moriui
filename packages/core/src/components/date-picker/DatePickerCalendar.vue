<script setup lang="ts">
  import type { DateValue } from 'reka-ui'
  import type { HTMLAttributes } from 'vue'

  import { DatePickerCalendar } from 'reka-ui'
  import { datePickerVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'] }
  interface CalendarSlotProps {
    date: DateValue
    fixedWeeks: boolean
    grid: Array<{ value: DateValue, rows: DateValue[][] }>
    locale: string
    weekDays: string[]
    weekStartsOn: number
  }

  const props = defineProps<Props>()
  defineSlots<{ default: (props: CalendarSlotProps) => unknown }>()
</script>

<template>
  <DatePickerCalendar v-slot="slotProps" :class="datePickerVariants().calendar({ class: props.class as never })" data-slot="date-picker-calendar">
    <slot v-bind="slotProps" />
  </DatePickerCalendar>
</template>
