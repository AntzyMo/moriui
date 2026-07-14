<script setup lang="ts">
  import type { DateValue } from 'reka-ui'

  import { shallowRef } from 'vue'
  import { CalendarDate } from '@internationalized/date'

  import {
    DatePicker,
    DatePickerCalendar,
    DatePickerCell,
    DatePickerCellTrigger,
    DatePickerContent,
    DatePickerField,
    DatePickerGrid,
    DatePickerGridBody,
    DatePickerGridHead,
    DatePickerGridRow,
    DatePickerHeadCell,
    DatePickerHeader,
    DatePickerHeading,
    DatePickerInput,
    DatePickerNext,
    DatePickerPrev,
    DatePickerTrigger
  } from '../src/components/date-picker'

  const value = shallowRef<DateValue>()
  const placeholder = new CalendarDate(2024, 4, 1)
</script>

<template>
  <DatePicker v-model="value" :default-placeholder="placeholder" locale="en-US">
    <DatePickerField #default="{ segments }">
      <DatePickerInput v-for="segment in segments" :key="segment.part" :part="segment.part">
        {{ segment.value }}
      </DatePickerInput>
      <DatePickerTrigger aria-label="打开日期选择器" />
    </DatePickerField>
    <DatePickerContent>
      <DatePickerCalendar #default="{ grid, weekDays }">
        <DatePickerHeader><DatePickerPrev aria-label="上个月" /><DatePickerHeading /><DatePickerNext aria-label="下个月" /></DatePickerHeader>
        <DatePickerGrid v-for="month in grid" :key="month.value.toString()">
          <DatePickerGridHead>
            <DatePickerGridRow>
              <DatePickerHeadCell v-for="weekDay in weekDays" :key="weekDay">
                {{ weekDay }}
              </DatePickerHeadCell>
            </DatePickerGridRow>
          </DatePickerGridHead>
          <DatePickerGridBody>
            <DatePickerGridRow v-for="(week, index) in month.rows" :key="index">
              <DatePickerCell v-for="day in week" :key="day.toString()" :date="day">
                <DatePickerCellTrigger :day="day" :month="month.value" />
              </DatePickerCell>
            </DatePickerGridRow>
          </DatePickerGridBody>
        </DatePickerGrid>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePicker>
  <output data-testid="value">{{ value?.toString() }}</output>
</template>
