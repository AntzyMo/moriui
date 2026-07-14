<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { HoverCardArrowProps } from 'reka-ui'

  import { hoverCardVariants } from './variants'
  import { HoverCardArrow, useForwardProps } from 'reka-ui'

  interface Props extends HoverCardArrowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = hoverCardVariants()
</script>

<template>
  <HoverCardArrow
    v-bind="forwarded"
    :class="slots.arrow({ class: props.class as never })"
    data-slot="hover-card-arrow"
  >
    <slot />
  </HoverCardArrow>
</template>
