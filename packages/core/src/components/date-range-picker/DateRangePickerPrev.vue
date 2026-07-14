<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DateRangePickerPrevProps } from 'reka-ui'

  import { ChevronLeft } from '@lucide/vue'
  import { DateRangePickerPrev, useForwardProps } from 'reka-ui'

  import { dateRangePickerVariants } from './variants'

  interface Props extends DateRangePickerPrevProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DateRangePickerPrev
    #default="slotProps"
    v-bind="forwarded"
    :class="dateRangePickerVariants().prev({ class: props.class as never })"
    data-slot="date-range-picker-prev"
  >
    <slot v-bind="slotProps">
      <ChevronLeft :class="dateRangePickerVariants().prevIcon()" aria-hidden="true" data-slot="date-range-picker-prev-icon" />
    </slot>
  </DateRangePickerPrev>
</template>
