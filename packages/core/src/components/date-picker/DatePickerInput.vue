<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerInputProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerInput, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerInputProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerInput
    #default="slotProps"
    v-bind="forwarded"
    :class="datePickerVariants().input({ class: props.class as never })"
    data-slot="date-picker-input"
  >
    <slot v-bind="slotProps" />
  </DatePickerInput>
</template>
