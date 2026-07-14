<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, ComboboxItemEmits, ComboboxItemProps, ListboxItemSelectEvent } from 'reka-ui'

  import { commandVariants } from './variants'
  import { ComboboxItem, useForwardProps } from 'reka-ui'

  interface Props extends Omit<ComboboxItemProps, 'value'> {
    value: AcceptableValue
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<ComboboxItemEmits>()
  const forwarded = useForwardProps(props)
  const slots = commandVariants()

  function handleSelect(event: ListboxItemSelectEvent<AcceptableValue>) {
    emit('select', event)
    event.preventDefault()
  }
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :value="props.value"
    :class="slots.item({ class: props.class as never })"
    data-slot="command-item"
    @select="handleSelect"
  >
    <slot>{{ value }}</slot>
  </ComboboxItem>
</template>
