<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerGridProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerGrid, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerGridProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerGrid v-bind="forwarded" :class="datePickerVariants().grid({ class: props.class as never })" data-slot="date-picker-grid">
    <slot />
  </DatePickerGrid>
</template>
