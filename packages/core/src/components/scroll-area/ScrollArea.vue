<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ScrollAreaRootProps } from 'reka-ui'

  import { scrollAreaVariants } from './variants'
  import ScrollAreaCorner from './ScrollAreaCorner.vue'
  import { ScrollAreaRoot, useForwardProps } from 'reka-ui'
  import ScrollAreaViewport from './ScrollAreaViewport.vue'
  import ScrollAreaScrollbar from './ScrollAreaScrollbar.vue'

  export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'

  interface Props extends Omit<ScrollAreaRootProps, 'asChild'> {
    class?: HTMLAttributes['class']
    orientation?: ScrollAreaOrientation
  }

  const props = withDefaults(defineProps<Props>(), {
    orientation: 'vertical'
  })
  const forwarded = useForwardProps(() => {
    const { class: _class, orientation: _orientation, ...rekaProps } = props
    return rekaProps
  })
  const slots = scrollAreaVariants()
</script>

<template>
  <ScrollAreaRoot
    v-bind="forwarded"
    :class="slots.root({ class: props.class as never })"
    :data-orientation="props.orientation"
    data-slot="scroll-area"
  >
    <ScrollAreaViewport>
      <slot />
    </ScrollAreaViewport>

    <slot name="scrollbar">
      <ScrollAreaScrollbar
        v-if="props.orientation === 'vertical' || props.orientation === 'both'"
        orientation="vertical"
      />
      <ScrollAreaScrollbar
        v-if="props.orientation === 'horizontal' || props.orientation === 'both'"
        orientation="horizontal"
      />
      <ScrollAreaCorner v-if="props.orientation === 'both'" />
    </slot>
  </ScrollAreaRoot>
</template>
