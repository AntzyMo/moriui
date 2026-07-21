<script setup lang="ts">
  import type { DateValue } from 'reka-ui'

  import { shallowRef } from 'vue'
  import { Calendar } from 'moriui'
  import { CalendarDate } from '@internationalized/date'

  const date = shallowRef<DateValue>(new CalendarDate(2026, 1, 12))
</script>

<template>
  <Calendar v-model="date" locale="zh-CN" class="rounded-lg border" />
</template>
