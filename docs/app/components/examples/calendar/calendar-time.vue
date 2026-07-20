<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from 'reka-ui'
import { Calendar } from 'moriui'
import { CalendarDate } from '@internationalized/date'
import { Clock } from '@lucide/vue'

const date = shallowRef<DateValue>(new CalendarDate(2026, 7, 12))
</script>

<template>
  <div class="w-fit">
    <Calendar v-model="date" locale="zh-CN" class="rounded-lg border" />
    <div class="flex items-center gap-4 border-t bg-muted/30 p-3">
      <div class="flex items-center gap-2">
        <label for="time-from" class="text-sm text-muted-foreground">开始</label>
        <div class="flex items-center gap-1 rounded-md border bg-background px-3 py-1.5">
          <input
            id="time-from"
            type="time"
            step="1"
            value="10:30:00"
            class="w-20 border-none bg-transparent text-sm outline-none"
          />
          <Clock class="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <label for="time-to" class="text-sm text-muted-foreground">结束</label>
        <div class="flex items-center gap-1 rounded-md border bg-background px-3 py-1.5">
          <input
            id="time-to"
            type="time"
            step="1"
            value="12:30:00"
            class="w-20 border-none bg-transparent text-sm outline-none"
          />
          <Clock class="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  </div>
</template>
