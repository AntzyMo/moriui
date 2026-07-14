<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarGridRowProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarGridRow, useForwardProps } from 'reka-ui'

  interface Props extends CalendarGridRowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridRow
    v-bind="forwarded"
    :class="calendarVariants().row({ class: props.class as never })"
    data-slot="calendar-grid-row"
  >
    <slot />
  </CalendarGridRow>
</template>
