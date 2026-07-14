<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { HoverCardContentProps } from 'reka-ui'

  import { hoverCardVariants } from './variants'
  import { HoverCardContent, useForwardProps } from 'reka-ui'

  interface Props extends HoverCardContentProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    sideOffset: 4
  })
  const forwarded = useForwardProps(props)
  const slots = hoverCardVariants()
</script>

<template>
  <HoverCardContent
    v-bind="forwarded"
    :class="slots.content({ class: props.class as never })"
    data-slot="hover-card-content"
  >
    <slot />
  </HoverCardContent>
</template>
