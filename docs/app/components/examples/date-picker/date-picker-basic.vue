<script setup lang="ts">
  import { ref } from 'vue'
  import { format } from 'date-fns'
  import { zhCN } from 'date-fns/locale'
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
    DatePickerTrigger,
    Label

  } from 'moriui'

  const date = ref<Date>()
</script>

<template>
  <div class="mx-auto w-44">
    <Label for="date-picker-simple" class="mb-2 block text-sm font-medium">日期</Label>
    <DatePicker v-model="date">
      <DatePickerTrigger
        id="date-picker-simple"
        class="flex w-full items-center justify-start gap-2 rounded-lg border border-input bg-background px-3 py-2 text-left text-sm font-normal shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <span :class="date ? 'text-foreground' : 'text-muted-foreground'">
          {{ date ? format(date, 'PPP', { locale: zhCN }) : '选择日期' }}
        </span>
      </DatePickerTrigger>
      <DatePickerContent class="w-auto rounded-lg border bg-popover p-0 shadow-md" align="start">
        <DatePickerCalendar v-slot="{ grid, weekDays }">
          <DatePickerHeader class="flex items-center justify-between px-3 pt-3">
            <DatePickerPrev />
            <DatePickerHeading class="text-sm font-medium" />
            <DatePickerNext />
          </DatePickerHeader>
          <div class="p-3">
            <DatePickerGrid v-for="month in grid" :key="month.value.toString()">
              <DatePickerGridHead>
                <DatePickerGridRow>
                  <DatePickerHeadCell v-for="day in weekDays" :key="day" class="h-8 w-8 text-center text-xs text-muted-foreground">
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="index">
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="h-8 w-8 p-0"
                  >
                    <DatePickerCellTrigger :day="weekDate" :month="month.value" class="flex h-8 w-8 items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:bg-accent data-today:text-accent-foreground data-outside-view:text-muted-foreground/50" />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePicker>
  </div>
</template>
