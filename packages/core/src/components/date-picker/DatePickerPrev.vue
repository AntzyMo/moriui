<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerPrevProps } from 'reka-ui'

  import { ChevronLeft } from '@lucide/vue'
  import { DatePickerPrev, useForwardProps } from 'reka-ui'

  import { datePickerVariants } from './variants'

  interface Props extends DatePickerPrevProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerPrev
    v-slot="slotProps"
    v-bind="forwarded"
    :class="datePickerVariants().prev({ class: props.class as never })"
    data-slot="date-picker-prev"
  >
    <slot v-bind="slotProps">
      <ChevronLeft :class="datePickerVariants().prevIcon()" aria-hidden="true" data-slot="date-picker-prev-icon" />
    </slot>
  </DatePickerPrev>
</template>
