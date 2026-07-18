<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerNextProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { DateRangePickerNext, useForwardProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'

  interface Props extends DateRangePickerNextProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerNext
    v-slot="slotProps"
    v-bind="forwarded"
    :class="dateRangePickerVariants().next({ class: props.class as never })"
    data-slot="date-range-picker-next"
  >
    <slot v-bind="slotProps">
      <ChevronRight :class="dateRangePickerVariants().nextIcon()" aria-hidden="true" data-slot="date-range-picker-next-icon" />
    </slot>
  </DateRangePickerNext>
</template>
