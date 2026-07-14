<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectItemTextProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectItemText, useForwardProps } from 'reka-ui'

  interface Props extends SelectItemTextProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectItemText
    v-bind="forwarded"
    :class="slots.itemText({ class: props.class as never })"
    data-slot="select-item-text"
  >
    <slot />
  </SelectItemText>
</template>
