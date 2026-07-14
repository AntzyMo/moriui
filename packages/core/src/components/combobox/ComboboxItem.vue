<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<ComboboxItemProps, 'value'> {
    value: AcceptableValue
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<ComboboxItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :value="props.value"
    :class="slots.item({ class: props.class as never })"
    data-slot="combobox-item"
  >
    <slot>{{ value }}</slot>
  </ComboboxItem>
</template>
