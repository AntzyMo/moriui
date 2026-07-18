<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarNextProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { CalendarNext, useForwardProps } from 'reka-ui'

  import { calendarVariants } from './variants'

  interface Props extends CalendarNextProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarNext
    v-slot="slotProps"
    v-bind="forwarded"
    :class="calendarVariants().next({ class: props.class as never })"
    data-slot="calendar-next"
  >
    <slot v-bind="slotProps">
      <ChevronRight
        :class="calendarVariants().nextIcon()"
        aria-hidden="true"
        data-slot="calendar-next-icon"
      />
    </slot>
  </CalendarNext>
</template>
