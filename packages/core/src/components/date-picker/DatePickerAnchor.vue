<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerAnchorProps } from 'reka-ui'

  import { datePickerVariants } from './variants'
  import { DatePickerAnchor, useForwardProps } from 'reka-ui'

  interface Props extends DatePickerAnchorProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerAnchor v-bind="forwarded" :class="datePickerVariants().anchor({ class: props.class as never })" data-slot="date-picker-anchor">
    <slot />
  </DatePickerAnchor>
</template>
