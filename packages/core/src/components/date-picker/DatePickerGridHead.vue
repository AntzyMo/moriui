<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerGridHeadProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerGridHead, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerGridHeadProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerGridHead v-bind="forwarded" :class="datePickerVariants().gridHead({ class: props.class as never })" data-slot="date-picker-grid-head">
    <slot />
  </DatePickerGridHead>
</template>
