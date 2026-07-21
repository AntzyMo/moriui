<script setup lang="ts">
  import type { DateValue } from 'reka-ui'

  import { shallowRef } from 'vue'
  import { Calendar } from 'moriui'
  import { CalendarDate } from '@internationalized/date'

  const start = new CalendarDate(2026, 1, 12)
  const range: DateValue[] = []
  for (let i = 0; i < 30; i++) {
    range.push(start.add({ days: i }))
  }
  const dates = shallowRef(range)
</script>

<template>
  <Calendar
    v-model="dates"
    multiple
    :number-of-months="2"
    locale="zh-CN"
    class="rounded-lg border"
  />
</template>
