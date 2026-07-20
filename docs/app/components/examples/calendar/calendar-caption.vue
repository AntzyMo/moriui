<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from 'reka-ui'
import { Calendar } from 'moriui'
import { CalendarDate } from '@internationalized/date'

const date = shallowRef<DateValue>(new CalendarDate(2026, 7, 15))
</script>

<template>
  <Calendar v-model="date" locale="zh-CN" class="rounded-lg border">
    <template #heading="{ headingValue }">
      <div class="flex items-center gap-1 text-sm font-medium">
        <span class="text-primary">{{ headingValue }}</span>
      </div>
    </template>
  </Calendar>
</template>
