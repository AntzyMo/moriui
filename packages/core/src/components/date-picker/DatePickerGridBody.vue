<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerGridBodyProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerGridBody, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerGridBodyProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerGridBody v-bind="forwarded" :class="datePickerVariants().gridBody({ class: props.class as never })" data-slot="date-picker-grid-body">
    <slot />
  </DatePickerGridBody>
</template>
