<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarCellTriggerProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarCellTrigger, useForwardProps } from 'reka-ui'

  interface Props extends CalendarCellTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarCellTrigger
    v-slot="slotProps"
    v-bind="forwarded"
    :class="calendarVariants().cellTrigger({ class: props.class as never })"
    data-slot="calendar-cell-trigger"
  >
    <slot v-bind="slotProps">
      {{ slotProps.dayValue }}
    </slot>
  </CalendarCellTrigger>
</template>
