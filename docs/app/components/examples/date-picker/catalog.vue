<script setup lang="ts">
  import { ref } from 'vue'
  import {
    DatePicker,
    DatePickerCalendar,
    DatePickerCell,
    DatePickerCellTrigger,
    DatePickerContent,
    DatePickerGrid,
    DatePickerGridBody,
    DatePickerGridHead,
    DatePickerGridRow,
    DatePickerHeadCell,
    DatePickerHeader,
    DatePickerHeading,
    DatePickerNext,
    DatePickerPrev,
    DatePickerTrigger
  } from 'moriui'

  const date = ref<Date>()
</script>

<template>
  <DatePicker v-model="date" class="mx-auto w-fit">
    <DatePickerTrigger /><DatePickerContent>
      <DatePickerCalendar v-slot="{ grid, weekDays }">
        <DatePickerHeader><DatePickerPrev /><DatePickerHeading /><DatePickerNext /></DatePickerHeader><DatePickerGrid v-for="month in grid" :key="month.value.toString()">
          <DatePickerGridHead>
            <DatePickerGridRow>
              <DatePickerHeadCell v-for="day in weekDays" :key="day">
                {{ day }}
              </DatePickerHeadCell>
            </DatePickerGridRow>
          </DatePickerGridHead><DatePickerGridBody>
            <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="index">
              <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
                <DatePickerCellTrigger :day="weekDate" :month="month.value">
                  {{ weekDate.day }}
                </DatePickerCellTrigger>
              </DatePickerCell>
            </DatePickerGridRow>
          </DatePickerGridBody>
        </DatePickerGrid>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePicker>
</template>
