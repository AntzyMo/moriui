<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxArrowProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxArrow, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxArrowProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxArrow
    v-bind="forwarded"
    :class="slots.arrow({ class: props.class as never })"
    data-slot="combobox-arrow"
  >
    <slot />
  </ComboboxArrow>
</template>
