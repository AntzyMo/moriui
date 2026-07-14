<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarHeaderProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarHeader, useForwardProps } from 'reka-ui'

  interface Props extends CalendarHeaderProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarHeader
    v-bind="forwarded"
    :class="calendarVariants().header({ class: props.class as never })"
    data-slot="calendar-header"
  >
    <slot />
  </CalendarHeader>
</template>
