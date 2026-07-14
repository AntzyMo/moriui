<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { HoverCardTriggerProps } from 'reka-ui'

  import { hoverCardVariants } from './variants'
  import { HoverCardTrigger, useForwardProps } from 'reka-ui'

  interface Props extends HoverCardTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = hoverCardVariants()
</script>

<template>
  <HoverCardTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="hover-card-trigger"
  >
    <slot />
  </HoverCardTrigger>
</template>
