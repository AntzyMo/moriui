<script setup lang="ts">
  import type { DateRange } from 'reka-ui'

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
    DateRangePickerTrigger
  } from '../src/components/date-range-picker'

  const value = shallowRef<DateRange>({ start: undefined, end: undefined })
  const placeholder = new CalendarDate(2024, 4, 1)
</script>

<template>
  <DateRangePicker v-model="value" :default-placeholder="placeholder" locale="en-US">
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
      <DateRangePickerTrigger aria-label="打开日期范围选择器" />
    </DateRangePickerField>
    <DateRangePickerContent>
      <DateRangePickerCalendar v-slot="{ grid, weekDays }">
        <DateRangePickerHeader><DateRangePickerPrev aria-label="上个月" /><DateRangePickerHeading /><DateRangePickerNext aria-label="下个月" /></DateRangePickerHeader>
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
  <output data-testid="range">{{ value.start?.toString() }}|{{ value.end?.toString() }}</output>
</template>
