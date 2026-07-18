<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { DateRangePickerField } from 'reka-ui'
  import { dateRangePickerVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
</script>

<template>
  <DateRangePickerField v-slot="slotProps" :class="dateRangePickerVariants().field({ class: props.class as never })" data-slot="date-range-picker-field">
    <slot v-bind="slotProps" />
  </DateRangePickerField>
</template>
