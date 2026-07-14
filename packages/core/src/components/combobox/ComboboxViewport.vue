<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxViewportProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxViewport, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxViewportProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxViewport
    v-bind="forwarded"
    :class="slots.viewport({ class: props.class as never })"
    data-slot="combobox-viewport"
  >
    <slot />
  </ComboboxViewport>
</template>
