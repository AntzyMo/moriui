<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerCloseProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerClose, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerCloseProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerClose v-bind="forwarded" :class="datePickerVariants().close({ class: props.class as never })" data-slot="date-picker-close">
    <slot />
  </DatePickerClose>
</template>
