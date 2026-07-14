<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerArrowProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerArrow, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerArrowProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerArrow v-bind="forwarded" :class="datePickerVariants().arrow({ class: props.class as never })" data-slot="date-picker-arrow" />
</template>
