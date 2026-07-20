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
  start: new CalendarDate(2024, 4, 1),
  end: new CalendarDate(2024, 4, 15),
})
</script>

<template>
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
      <DateRangePickerCalendar v-slot="{ grid, weekDays }">
        <DateRangePickerHeader>
          <DateRangePickerPrev aria-label="上个月" />
          <DateRangePickerHeading />
          <DateRangePickerNext aria-label="下个月" />
        </DateRangePickerHeader>
        <DateRangePickerGrid v-for="month in grid" :key="month.value.toString()">
          <DateRangePickerGridHead>
            <DateRangePickerGridRow>
              <DateRangePickerHeadCell v-for="day in weekDays" :key="day">
                {{ day }}
              </DateRangePickerHeadCell>
            </DateRangePickerGridRow>
          </DateRangePickerGridHead>
          <DateRangePickerGridBody>
            <DateRangePickerGridRow v-for="(week, idx) in month.rows" :key="idx">
              <DateRangePickerCell v-for="day in week" :key="day.toString()" :date="day">
                <DateRangePickerCellTrigger :day="day" :month="month.value" />
              </DateRangePickerCell>
            </DateRangePickerGridRow>
          </DateRangePickerGridBody>
        </DateRangePickerGrid>
      </DateRangePickerCalendar>
    </DateRangePickerContent>
  </DateRangePicker>
</template>
