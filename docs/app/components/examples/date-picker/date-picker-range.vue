<script setup lang="ts">
import { Calendar } from '@lucide/vue'
import { addDays, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { DatePicker, DatePickerCalendar, DatePickerCell, DatePickerCellTrigger, DatePickerContent, DatePickerGrid, DatePickerGridBody, DatePickerGridHead, DatePickerGridRow, DatePickerHeadCell, DatePickerHeader, DatePickerHeading, DatePickerNext, DatePickerPrev, DatePickerTrigger } from 'moriui'
import { Label } from 'moriui'
import type { DateValue } from 'reka-ui'
import { ref } from 'vue'

const date = ref<{ start?: DateValue; end?: DateValue }>({
  start: new Date(new Date().getFullYear(), 0, 20),
  end: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
})
</script>
<template>
  <div class="mx-auto w-60">
    <Label for="date-picker-range" class="mb-2 block text-sm font-medium">日期范围</Label>
    <DatePicker v-model="date" type="range" class="mx-auto w-fit">
      <DatePickerTrigger
        id="date-picker-range"
        class="flex w-full items-center justify-start gap-2 rounded-lg border border-input bg-background px-2.5 py-2 text-left text-sm font-normal shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <Calendar class="size-4 shrink-0 text-muted-foreground" />
        <span v-if="date?.start" class="text-foreground">
          <template v-if="date?.end">
            {{ format(date.start, 'MMM dd, y', { locale: zhCN }) }} - {{ format(date.end, 'MMM dd, y', { locale: zhCN }) }}
          </template>
          <template v-else>
            {{ format(date.start, 'MMM dd, y', { locale: zhCN }) }}
          </template>
        </span>
        <span v-else class="text-muted-foreground">选择日期范围</span>
      </DatePickerTrigger>
      <DatePickerContent class="w-auto rounded-lg border bg-popover p-0 shadow-md" align="start">
        <DatePickerCalendar v-slot="{ grid, weekDays }">
          <DatePickerHeader class="flex items-center justify-between px-3 pt-3">
            <DatePickerPrev />
            <DatePickerHeading class="text-sm font-medium" />
            <DatePickerNext />
          </DatePickerHeader>
          <div class="p-3">
            <DatePickerGrid v-for="month in grid" :key="month.value.toString()" class="[&:not(:first-child)]:ml-4">
              <DatePickerGridHead>
                <DatePickerGridRow>
                  <DatePickerHeadCell v-for="day in weekDays" :key="day" class="h-8 w-8 text-center text-xs text-muted-foreground">
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="index">
                  <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="h-8 w-8 p-0">
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
