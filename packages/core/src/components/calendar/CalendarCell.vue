<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarCellProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarCell, useForwardProps } from 'reka-ui'

  interface Props extends CalendarCellProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarCell
    v-bind="forwarded"
    :class="calendarVariants().cell({ class: props.class as never })"
    data-slot="calendar-cell"
  >
    <slot />
  </CalendarCell>
</template>
