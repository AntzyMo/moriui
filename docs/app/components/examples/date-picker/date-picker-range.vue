<script setup lang="ts">
  import type { DateValue } from 'reka-ui'

  import { ref } from 'vue'
  import { format } from 'date-fns'
  import { Calendar } from '@lucide/vue'
  import { zhCN } from 'date-fns/locale'
  import { CalendarDate } from '@internationalized/date'
  import {
    DateRangePicker,
    DateRangePickerCalendar,
    DateRangePickerCell,
    DateRangePickerCellTrigger,
    DateRangePickerContent,
    DateRangePickerGrid,
    DateRangePickerGridBody,
    DateRangePickerGridHead,
    DateRangePickerGridRow,
    DateRangePickerHeadCell,
    DateRangePickerHeader,
    DateRangePickerHeading,
    DateRangePickerNext,
    DateRangePickerPrev,
    DateRangePickerTrigger,
    Label

  } from 'moriui'

  function toNativeDate(d: DateValue | undefined): Date | undefined {
    if (!d)
      return undefined
    if (d instanceof Date)
      return d
    if (d instanceof CalendarDate)
      return d.toDate('UTC')
    return undefined
  }

  const startDate = new Date(new Date().getFullYear(), 0, 20)
  const date = ref<{ start?: DateValue, end?: DateValue }>({
    start: new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()),
    end: new CalendarDate(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate() + 20
    )
  })
</script>

<template>
  <div class="mx-auto w-60">
    <Label for="date-picker-range" class="mb-2 block text-sm font-medium">日期范围</Label>
    <DateRangePicker v-model="date" class="mx-auto w-fit">
      <DateRangePickerTrigger
        id="date-picker-range"
        class="flex w-full items-center justify-start gap-2 rounded-lg border border-input bg-background px-2.5 py-2 text-left text-sm font-normal shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <Calendar class="size-4 shrink-0 text-muted-foreground" />
        <span v-if="date?.start" class="text-foreground">
          <template v-if="date?.end">
            {{ format(toNativeDate(date.start)!, 'MMM dd, y', { locale: zhCN }) }} - {{ format(toNativeDate(date.end)!, 'MMM dd, y', { locale: zhCN }) }}
          </template>
          <template v-else>
            {{ format(toNativeDate(date.start)!, 'MMM dd, y', { locale: zhCN }) }}
          </template>
        </span>
        <span v-else class="text-muted-foreground">选择日期范围</span>
      </DateRangePickerTrigger>
      <DateRangePickerContent class="w-auto rounded-lg border bg-popover p-0 shadow-md" align="start">
        <DateRangePickerCalendar v-slot="{ grid, weekDays }">
          <DateRangePickerHeader class="flex items-center justify-between px-3 pt-3">
            <DateRangePickerPrev />
            <DateRangePickerHeading class="text-sm font-medium" />
            <DateRangePickerNext />
          </DateRangePickerHeader>
          <div class="p-3">
            <DateRangePickerGrid v-for="month in grid" :key="month.value.toString()" class="[&:not(:first-child)]:ml-4">
              <DateRangePickerGridHead>
                <DateRangePickerGridRow>
                  <DateRangePickerHeadCell v-for="day in weekDays" :key="day" class="h-8 w-8 text-center text-xs text-muted-foreground">
                    {{ day }}
                  </DateRangePickerHeadCell>
                </DateRangePickerGridRow>
              </DateRangePickerGridHead>
              <DateRangePickerGridBody>
                <DateRangePickerGridRow v-for="(weekDates, index) in month.rows" :key="index">
                  <DateRangePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="h-8 w-8 p-0"
                  >
                    <DateRangePickerCellTrigger :day="weekDate" :month="month.value" class="flex h-8 w-8 items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:bg-accent data-today:text-accent-foreground data-outside-view:text-muted-foreground/50" />
                  </DateRangePickerCell>
                </DateRangePickerGridRow>
              </DateRangePickerGridBody>
            </DateRangePickerGrid>
          </div>
        </DateRangePickerCalendar>
      </DateRangePickerContent>
    </DateRangePicker>
  </div>
</template>
