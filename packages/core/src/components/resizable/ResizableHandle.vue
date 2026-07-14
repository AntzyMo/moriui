<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from 'reka-ui'

  import { computed } from 'vue'
  import { SplitterResizeHandle, useForwardPropsEmits } from 'reka-ui'

  import { resizableVariants } from './variants'

  interface Props extends SplitterResizeHandleProps {
    class?: HTMLAttributes['class']
    withHandle?: boolean
  }

  const props = defineProps<Props>()
  const emits = defineEmits<SplitterResizeHandleEmits>()
  const forwarded = useForwardPropsEmits(computed(() => {
    const { withHandle: _withHandle, ...rekaProps } = props
    return rekaProps
  }), emits)
  const slots = resizableVariants()
</script>

<template>
  <SplitterResizeHandle
    v-bind="forwarded"
    :class="slots.handle({ class: props.class as never })"
    data-slot="resizable-handle"
  >
    <template v-if="props.withHandle">
      <span :class="slots.grip()" aria-hidden="true" data-slot="resizable-handle-grip">
        <slot />
      </span>
    </template>
    <slot v-else />
  </SplitterResizeHandle>
</template>
