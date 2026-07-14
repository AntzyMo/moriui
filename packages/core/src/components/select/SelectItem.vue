<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, SelectItemEmits, SelectItemProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<SelectItemProps, 'value'> {
    value: AcceptableValue
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<SelectItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = selectVariants()
</script>

<template>
  <SelectItem
    v-bind="forwarded"
    :value="props.value"
    :class="slots.item({ class: props.class as never })"
    data-slot="select-item"
  >
    <slot />
  </SelectItem>
</template>
