<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarHeadingProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarHeading, useForwardProps } from 'reka-ui'

  interface Props extends CalendarHeadingProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarHeading
    v-slot="slotProps"
    v-bind="forwarded"
    :class="calendarVariants().heading({ class: props.class as never })"
    data-slot="calendar-heading"
  >
    <slot v-bind="slotProps">
      {{ slotProps.headingValue }}
    </slot>
  </CalendarHeading>
</template>
