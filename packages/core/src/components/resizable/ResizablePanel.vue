<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SplitterPanelEmits, SplitterPanelProps } from 'reka-ui'

  import { resizableVariants } from './variants'
  import { SplitterPanel, useForwardExpose, useForwardPropsEmits } from 'reka-ui'

  interface Props extends SplitterPanelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emits = defineEmits<SplitterPanelEmits>()
  const forwarded = useForwardPropsEmits(props, emits)
  const { forwardRef } = useForwardExpose()
  const slots = resizableVariants()
</script>

<template>
  <SplitterPanel
    :ref="forwardRef"
    #default="slotProps"
    v-bind="forwarded"
    :class="slots.panel({ class: props.class as never })"
    data-slot="resizable-panel"
  >
    <slot v-bind="slotProps" />
  </SplitterPanel>
</template>
