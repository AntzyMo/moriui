<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { DatePickerField } from 'reka-ui'
  import { datePickerVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
</script>

<template>
  <DatePickerField v-slot="slotProps" :class="datePickerVariants().field({ class: props.class as never })" data-slot="date-picker-field">
    <slot v-bind="slotProps" />
  </DatePickerField>
</template>
