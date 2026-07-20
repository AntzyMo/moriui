<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
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
  DateRangePickerTrigger,
} from 'moriui'

const value = shallowRef({
  start: new CalendarDate(2024, 1, 20),
  end: new CalendarDate(2024, 2, 10),
})

function format(date: CalendarDate | undefined): string {
  if (!date) return ''
  return `${date.year}年${date.month}月${date.day}日`
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <DateRangePicker v-model="value" locale="zh-CN" class="w-[320px]">
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
    <div class="text-sm text-muted-foreground">
      <template v-if="value.start && value.end">
        已选择：{{ format(value.start) }} – {{ format(value.end) }}
      </template>
      <template v-else>
        请选择日期范围
      </template>
    </div>
  </div>
</template>
