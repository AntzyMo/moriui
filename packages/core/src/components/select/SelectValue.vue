<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectValueProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectValue, useForwardProps } from 'reka-ui'

  interface Props extends SelectValueProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectValue
    v-bind="forwarded"
    :class="slots.value({ class: props.class as never })"
    data-slot="select-value"
  >
    <slot />
  </SelectValue>
</template>
