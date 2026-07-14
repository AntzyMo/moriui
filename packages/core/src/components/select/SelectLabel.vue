<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectLabelProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectLabel, useForwardProps } from 'reka-ui'

  interface Props extends SelectLabelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectLabel
    v-bind="forwarded"
    :class="slots.label({ class: props.class as never })"
    data-slot="select-label"
  >
    <slot />
  </SelectLabel>
</template>
