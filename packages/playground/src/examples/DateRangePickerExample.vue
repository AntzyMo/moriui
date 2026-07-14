<script setup lang="ts">
  import type { DateRange, DateValue } from 'reka-ui'

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
  } from 'moriui'

  const range = shallowRef<DateRange>({ start: undefined, end: undefined })
  const placeholder: DateValue = new CalendarDate(2026, 7, 13)
</script>

<template>
  <section class="playground__section">
    <h2>Date Range Picker</h2>
    <DateRangePicker
      v-model="range"
      :default-placeholder="placeholder"
      :number-of-months="2"
      locale="zh-CN"
    >
      <DateRangePickerField #default="{ segments }">
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
        <DateRangePickerCalendar #default="{ grid, weekDays }">
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
  </section>
</template>
