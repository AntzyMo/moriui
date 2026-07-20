<script setup lang="ts">
import { Calendar } from '@lucide/vue'
import { parseDate } from 'chrono-node'
import { DatePicker, DatePickerCalendar, DatePickerCell, DatePickerCellTrigger, DatePickerContent, DatePickerGrid, DatePickerGridBody, DatePickerGridHead, DatePickerGridRow, DatePickerHeadCell, DatePickerHeader, DatePickerHeading, DatePickerNext, DatePickerPrev, DatePickerTrigger } from 'moriui'
import { Label } from 'moriui'
import { ref } from 'vue'

function formatDate(date: Date | undefined): string {
  if (!date) return ''
  return date.toLocaleDateString('zh-CN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const open = ref(false)
const value = ref('后天')
const date = ref<Date | undefined>(parseDate(value.value) || undefined)
</script>
<template>
  <div class="mx-auto max-w-xs">
    <Label for="date-optional" class="mb-2 block text-sm font-medium">日程日期</Label>
    <div class="flex items-center rounded-lg border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
      <input
        id="date-optional"
        :value="value"
        placeholder="明天或下周"
        class="flex-1 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        @input="(e: Event) => {
          const target = e.target as HTMLInputElement
          value = target.value
          const parsed = parseDate(target.value)
          if (parsed) date = parsed
        }"
        @keydown.arrow-down.prevent="open = true"
      />
      <DatePicker v-model="date" v-model:open="open">
        <DatePickerTrigger
          class="mr-1 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="选择日期"
        >
          <Calendar class="size-4" />
        </DatePickerTrigger>
        <DatePickerContent class="w-auto rounded-lg border bg-popover p-0 shadow-md" align="end" :side-offset="8">
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
                    <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="h-8 w-8 p-0">
                      <DatePickerCellTrigger
                        :day="weekDate"
                        :month="month.value"
                        class="flex h-8 w-8 items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:bg-accent data-today:text-accent-foreground data-outside-view:text-muted-foreground/50"
                      />
                    </DatePickerCell>
                  </DatePickerGridRow>
                </DatePickerGridBody>
              </DatePickerGrid>
            </div>
          </DatePickerCalendar>
        </DatePickerContent>
      </DatePicker>
    </div>
    <p class="mt-2 px-1 text-sm text-muted-foreground">
      你的文章将于 <span class="font-medium text-foreground">{{ formatDate(date) }}</span> 发布。
    </p>
  </div>
</template>
