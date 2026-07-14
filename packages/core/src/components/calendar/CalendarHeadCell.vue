<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarHeadCellProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarHeadCell, useForwardProps } from 'reka-ui'

  interface Props extends CalendarHeadCellProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarHeadCell
    v-bind="forwarded"
    :class="calendarVariants().headCell({ class: props.class as never })"
    data-slot="calendar-head-cell"
  >
    <slot />
  </CalendarHeadCell>
</template>
