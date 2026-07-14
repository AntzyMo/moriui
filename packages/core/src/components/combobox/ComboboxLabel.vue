<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxLabelProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxLabel, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxLabelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxLabel
    v-bind="forwarded"
    :class="slots.label({ class: props.class as never })"
    data-slot="combobox-label"
  >
    <slot />
  </ComboboxLabel>
</template>
