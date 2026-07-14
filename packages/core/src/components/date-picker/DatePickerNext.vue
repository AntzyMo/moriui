<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DatePickerNextProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { DatePickerNext, useForwardProps } from 'reka-ui'

  import { datePickerVariants } from './variants'

  interface Props extends DatePickerNextProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <DatePickerNext
    #default="slotProps"
    v-bind="forwarded"
    :class="datePickerVariants().next({ class: props.class as never })"
    data-slot="date-picker-next"
  >
    <slot v-bind="slotProps">
      <ChevronRight :class="datePickerVariants().nextIcon()" aria-hidden="true" data-slot="date-picker-next-icon" />
    </slot>
  </DatePickerNext>
</template>
