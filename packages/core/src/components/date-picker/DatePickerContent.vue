<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerContentEmits, DatePickerContentProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerContent, useForwardPropsEmits } from 'reka-ui'

  interface Props extends DatePickerContentProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const emit = defineEmits<DatePickerContentEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DatePickerContent v-bind="forwarded" :class="datePickerVariants().content({ class: props.class as never })" data-slot="date-picker-content">
    <slot />
  </DatePickerContent>
</template>
