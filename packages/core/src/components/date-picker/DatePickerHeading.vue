<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerHeadingProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerHeading, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerHeadingProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerHeading
    v-slot="slotProps"
    v-bind="forwarded"
    :class="datePickerVariants().heading({ class: props.class as never })"
    data-slot="date-picker-heading"
  >
    <slot v-bind="slotProps" />
  </DatePickerHeading>
</template>
