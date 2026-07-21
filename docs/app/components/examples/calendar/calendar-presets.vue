<script setup lang="ts">
  import type { DateValue } from 'reka-ui'

  import { shallowRef } from 'vue'
  import { Calendar } from 'moriui'
  import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'

  const date = shallowRef<DateValue>(new CalendarDate(2026, 2, 12))
  const placeholder = shallowRef<DateValue>(new CalendarDate(2026, 2, 1))

  const presets = [
    { label: '今天', days: 0 },
    { label: '明天', days: 1 },
    { label: '3 天后', days: 3 },
    { label: '一周后', days: 7 },
    { label: '两周后', days: 14 }
  ]

  function selectPreset(days: number) {
    const d = today(getLocalTimeZone()).add({ days })
    date.value = d
    placeholder.value = d.set({ day: 1 })
  }
</script>

<template>
  <div class="w-fit">
    <Calendar
      v-model="date"
      v-model:placeholder="placeholder"
      fixed-weeks
      locale="zh-CN"
      class="rounded-lg border"
    />
    <div class="flex flex-wrap gap-2 border-t p-3">
      <button
        v-for="preset in presets"
        :key="preset.days"
        class="flex-1 rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
        @click="selectPreset(preset.days)"
      >
        {{ preset.label }}
      </button>
    </div>
  </div>
</template>
