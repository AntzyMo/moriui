<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectSeparatorProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectSeparator, useForwardProps } from 'reka-ui'

  interface Props extends SelectSeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectSeparator
    v-bind="forwarded"
    :class="slots.separator({ class: props.class as never })"
    data-slot="select-separator"
  />
</template>
