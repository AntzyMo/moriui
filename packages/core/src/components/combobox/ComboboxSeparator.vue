<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxSeparatorProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxSeparator, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxSeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxSeparator
    v-bind="forwarded"
    :class="slots.separator({ class: props.class as never })"
    data-slot="combobox-separator"
  >
    <slot />
  </ComboboxSeparator>
</template>
