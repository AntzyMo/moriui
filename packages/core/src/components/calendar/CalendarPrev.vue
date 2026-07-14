<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarPrevProps } from 'reka-ui'

  import { ChevronLeft } from '@lucide/vue'
  import { CalendarPrev, useForwardProps } from 'reka-ui'

  import { calendarVariants } from './variants'

  interface Props extends CalendarPrevProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarPrev
    #default="slotProps"
    v-bind="forwarded"
    :class="calendarVariants().prev({ class: props.class as never })"
    data-slot="calendar-prev"
  >
    <slot v-bind="slotProps">
      <ChevronLeft
        :class="calendarVariants().prevIcon()"
        aria-hidden="true"
        data-slot="calendar-prev-icon"
      />
    </slot>
  </CalendarPrev>
</template>
