<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarGridHeadProps } from 'reka-ui'

  import { calendarVariants } from './variants'
  import { CalendarGridHead, useForwardProps } from 'reka-ui'

  interface Props extends CalendarGridHeadProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridHead
    v-bind="forwarded"
    :class="calendarVariants().gridHead({ class: props.class as never })"
    data-slot="calendar-grid-head"
  >
    <slot />
  </CalendarGridHead>
</template>
