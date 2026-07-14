<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerContentEmits, DateRangePickerContentProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerContent, useForwardPropsEmits } from 'reka-ui'

  interface Props extends DateRangePickerContentProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const emit = defineEmits<DateRangePickerContentEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DateRangePickerContent v-bind="forwarded" :class="dateRangePickerVariants().content({ class: props.class as never })" data-slot="date-range-picker-content">
    <slot />
  </DateRangePickerContent>
</template>
