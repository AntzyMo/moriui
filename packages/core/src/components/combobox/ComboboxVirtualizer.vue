<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import type { ComboboxVirtualizerProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxVirtualizer, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxVirtualizerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const Primitive = ComboboxVirtualizer as Component
  const slots = comboboxVariants()
</script>

<template>
  <component
    :is="Primitive"
    #default="slotProps"
    v-bind="forwarded"
    :class="slots.virtualizer({ class: props.class as never })"
    data-slot="combobox-virtualizer"
  >
    <slot v-bind="slotProps" />
  </component>
</template>
