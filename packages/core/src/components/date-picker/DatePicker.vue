<script setup lang="ts">
  import type { DatePickerRootEmits, DatePickerRootProps, DateValue } from 'reka-ui'

  import { computed } from 'vue'
  import { CalendarDate } from '@internationalized/date'
  import { DatePickerRoot, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<DatePickerRootProps, 'modelValue'> {}

  type Emits = Omit<DatePickerRootEmits, 'update:modelValue'>

  const props = withDefaults(defineProps<Props>(), { closeOnSelect: true })
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<DateValue | Date>()
  const forwarded = useForwardPropsEmits(props, emit)

  function toDateValue(value: unknown): DateValue | undefined {
    if (!value) {
      return undefined
    }
    if (value instanceof Date) {
      return new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate())
    }
    // Handle range: { start?: Date | DateValue, end?: Date | DateValue }
    if (typeof value === 'object' && !Array.isArray(value)) {
      const range = value as Record<string, unknown>
      const start = range.start
      const end = range.end
      if (start instanceof Date || end instanceof Date) {
        return {
          ...range,
          ...(start instanceof Date ? { start: new CalendarDate(start.getFullYear(), start.getMonth() + 1, start.getDate()) } : {}),
          ...(end instanceof Date ? { end: new CalendarDate(end.getFullYear(), end.getMonth() + 1, end.getDate()) } : {})
        } as DateValue
      }
    }
    return value as DateValue
  }

  const rekaModel = computed({
    get: () => toDateValue(modelValue.value),
    set: val => {
      modelValue.value = val ?? undefined
    }
  })
</script>

<template>
  <DatePickerRoot v-bind="forwarded" v-model="rekaModel">
    <slot />
  </DatePickerRoot>
</template>
