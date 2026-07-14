<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerHeaderProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerHeader, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerHeaderProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerHeader v-bind="forwarded" :class="datePickerVariants().header({ class: props.class as never })" data-slot="date-picker-header">
    <slot />
  </DatePickerHeader>
</template>
