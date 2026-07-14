<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxGroupProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxGroup, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxGroupProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxGroup
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="combobox-group"
  >
    <slot />
  </ComboboxGroup>
</template>
