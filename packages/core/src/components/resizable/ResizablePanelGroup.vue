<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SplitterGroupEmits, SplitterGroupProps } from 'reka-ui'

  import { resizableVariants } from './variants'
  import { SplitterGroup, useForwardPropsEmits } from 'reka-ui'

  interface Props extends SplitterGroupProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emits = defineEmits<SplitterGroupEmits>()
  const forwarded = useForwardPropsEmits(props, emits)
  const slots = resizableVariants()
</script>

<template>
  <SplitterGroup
    v-slot="slotProps"
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="resizable-panel-group"
  >
    <slot v-bind="slotProps" />
  </SplitterGroup>
</template>
