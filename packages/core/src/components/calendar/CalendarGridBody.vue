<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarGridBodyProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarGridBody, useForwardProps } from 'reka-ui'

  interface Props extends CalendarGridBodyProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridBody
    v-bind="forwarded"
    :class="calendarVariants().gridBody({ class: props.class as never })"
    data-slot="calendar-grid-body"
  >
    <slot />
  </CalendarGridBody>
</template>
