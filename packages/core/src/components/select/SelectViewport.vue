<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectViewportProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectViewport, useForwardProps } from 'reka-ui'

  interface Props extends SelectViewportProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectViewport
    v-bind="forwarded"
    :class="slots.viewport({ class: props.class as never })"
    data-slot="select-viewport"
  >
    <slot />
  </SelectViewport>
</template>
