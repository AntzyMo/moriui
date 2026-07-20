<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from 'reka-ui'
import { Calendar } from 'moriui'
import { CalendarDate } from '@internationalized/date'

const dates = shallowRef<DateValue[]>([
  new CalendarDate(2026, 7, 10),
  new CalendarDate(2026, 7, 15),
  new CalendarDate(2026, 7, 20),
])
</script>

<template>
  <Calendar v-model="dates" multiple locale="zh-CN" class="rounded-lg border" />
</template>
