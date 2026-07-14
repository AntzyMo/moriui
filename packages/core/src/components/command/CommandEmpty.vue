<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxEmptyProps } from 'reka-ui'

  import { commandVariants } from './variants'
  import { ComboboxEmpty, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxEmptyProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = commandVariants()
</script>

<template>
  <ComboboxEmpty
    v-bind="forwarded"
    :class="slots.empty({ class: props.class as never })"
    data-slot="command-empty"
  >
    <slot>没有匹配的命令</slot>
  </ComboboxEmpty>
</template>
