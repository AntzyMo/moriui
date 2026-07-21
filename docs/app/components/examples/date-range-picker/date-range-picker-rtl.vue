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
    DirectionProvider
  } from 'moriui'

  const value = shallowRef({
    start: new CalendarDate(2024, 1, 20),
    end: new CalendarDate(2024, 2, 10)
  })
</script>

<template>
  <DirectionProvider dir="rtl">
    <DateRangePicker v-model="value" locale="ar">
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
        <DateRangePickerTrigger aria-label="اختيار نطاق التاريخ" />
      </DateRangePickerField>
      <DateRangePickerContent>
        <DateRangePickerCalendar v-slot="{ grid, weekDays }">
          <DateRangePickerHeader>
            <DateRangePickerPrev aria-label="الشهر السابق" />
            <DateRangePickerHeading />
            <DateRangePickerNext aria-label="الشهر التالي" />
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
  </DirectionProvider>
</template>
