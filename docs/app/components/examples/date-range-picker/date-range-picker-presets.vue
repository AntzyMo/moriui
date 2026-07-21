<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
  import {
    DateRangePicker,
    DateRangePickerCalendar,
    DateRangePickerCell,
    DateRangePickerCellTrigger,
    DateRangePickerContent,
    DateRangePickerField,
    DateRangePickerGrid,
    DateRangePickerGridBody,
    DateRangePickerGridHead,
    DateRangePickerGridRow,
    DateRangePickerHeadCell,
    DateRangePickerHeader,
    DateRangePickerHeading,
    DateRangePickerInput,
    DateRangePickerNext,
    DateRangePickerPrev,
    DateRangePickerTrigger
  } from 'moriui'

  const value = shallowRef({
    start: today(getLocalTimeZone()).subtract({ days: 6 }),
    end: today(getLocalTimeZone())
  })

  const presets = [
    {
      label: '最近 7 天',
      get: () => {
        const end = today(getLocalTimeZone())
        const start = end.subtract({ days: 6 })
        return { start, end }
      }
    },
    {
      label: '本月',
      get: () => {
        const now = today(getLocalTimeZone())
        const start = new CalendarDate(now.year, now.month, 1)
        const end = start.add({ months: 1 }).subtract({ days: 1 })
        return { start, end }
      }
    },
    {
      label: '上个月',
      get: () => {
        const now = today(getLocalTimeZone())
        const start = new CalendarDate(now.year, now.month, 1).subtract({ months: 1 })
        const end = new CalendarDate(now.year, now.month, 1).subtract({ days: 1 })
        return { start, end }
      }
    },
    {
      label: '最近 30 天',
      get: () => {
        const end = today(getLocalTimeZone())
        const start = end.subtract({ days: 29 })
        return { start, end }
      }
    },
    {
      label: '最近 90 天',
      get: () => {
        const end = today(getLocalTimeZone())
        const start = end.subtract({ days: 89 })
        return { start, end }
      }
    },
    {
      label: '今年',
      get: () => {
        const now = today(getLocalTimeZone())
        const start = new CalendarDate(now.year, 1, 1)
        const end = new CalendarDate(now.year, 12, 31)
        return { start, end }
      }
    }
  ]

  function applyPreset(preset: typeof presets[number]) {
    value.value = preset.get()
  }

  function format(date: CalendarDate | undefined): string {
    if (!date)
      return ''
    return `${date.year}年${date.month}月${date.day}日`
  }
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <DateRangePicker v-model="value" locale="zh-CN">
      <DateRangePickerField v-slot="{ segments }">
        <DateRangePickerInput
          v-for="segment in segments.start"
          :key="`start-${segment.part}`"
          type="start"
          :part="segment.part"
        >
          {{ segment.value }}
        </DateRangePickerInput>
        <span aria-hidden="true">–</span>
        <DateRangePickerInput
          v-for="segment in segments.end"
          :key="`end-${segment.part}`"
          type="end"
          :part="segment.part"
        >
          {{ segment.value }}
        </DateRangePickerInput>
        <DateRangePickerTrigger aria-label="选择日期范围" />
      </DateRangePickerField>
      <DateRangePickerContent>
        <div class="flex flex-wrap gap-1 p-2 border-b border-border">
          <button
            v-for="preset in presets"
            :key="preset.label"
            type="button"
            class="text-xs px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="applyPreset(preset)"
          >
            {{ preset.label }}
          </button>
        </div>
        <DateRangePickerCalendar v-slot="{ grid, weekDays }">
          <DateRangePickerHeader>
            <DateRangePickerPrev aria-label="上个月" />
            <DateRangePickerHeading />
            <DateRangePickerNext aria-label="下个月" />
          </DateRangePickerHeader>
          <DateRangePickerGrid v-for="month in grid" :key="month.value.toString()">
            <DateRangePickerGridHead>
              <DateRangePickerGridRow>
                <DateRangePickerHeadCell v-for="weekDay in weekDays" :key="weekDay">
                  {{ weekDay }}
                </DateRangePickerHeadCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridHead>
            <DateRangePickerGridBody>
              <DateRangePickerGridRow v-for="(week, index) in month.rows" :key="index">
                <DateRangePickerCell v-for="day in week" :key="day.toString()" :date="day">
                  <DateRangePickerCellTrigger :day="day" :month="month.value" />
                </DateRangePickerCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridBody>
          </DateRangePickerGrid>
        </DateRangePickerCalendar>
      </DateRangePickerContent>
    </DateRangePicker>
    <div v-if="value.start && value.end" class="text-sm text-muted-foreground">
      已选择：{{ format(value.start) }} – {{ format(value.end) }}
    </div>
  </div>
</template>
