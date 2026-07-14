<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarGridProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarGrid, useForwardProps } from 'reka-ui'

  interface Props extends CalendarGridProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGrid
    v-bind="forwarded"
    :class="calendarVariants().grid({ class: props.class as never })"
    data-slot="calendar-grid"
  >
    <slot />
  </CalendarGrid>
</template>
