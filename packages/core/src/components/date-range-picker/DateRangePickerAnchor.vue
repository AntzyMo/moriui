<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerAnchorProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'
  import { DateRangePickerAnchor, useForwardProps } from 'reka-ui'

  interface Props extends DateRangePickerAnchorProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerAnchor v-bind="forwarded" :class="dateRangePickerVariants().anchor({ class: props.class as never })" data-slot="date-range-picker-anchor">
    <slot />
  </DateRangePickerAnchor>
</template>
