<script setup lang="ts">
  import type { DateValue } from 'reka-ui'

  import { shallowRef } from 'vue'
  import { Calendar } from 'moriui'
  import { CalendarDate } from '@internationalized/date'

  const start = new CalendarDate(2026, 12, 8)
  const range: DateValue[] = []
  for (let i = 0; i < 11; i++) {
    range.push(start.add({ days: i }))
  }
  const dates = shallowRef<DateValue[]>(range)
</script>

<template>
  <Calendar
    v-model="dates"
    multiple
    locale="zh-CN"
    class="rounded-lg border"
  >
    <template #day="{ dayValue, today: isToday, selected, outsideView }">
      <div class="flex flex-col items-center gap-0.5">
        <span>{{ dayValue }}</span>
        <span
          v-if="!outsideView && isToday"
          class="text-[8px] font-medium text-primary"
        >今天</span>
        <span
          v-else-if="!outsideView && selected"
          class="text-[8px] font-medium text-primary-foreground"
        >已选</span>
        <span
          v-else-if="!outsideView"
          class="text-[8px] text-muted-foreground"
        >¥100</span>
      </div>
    </template>
  </Calendar>
</template>
