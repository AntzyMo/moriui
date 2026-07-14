<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { BubbleReactionsVariants } from './variants'

  import { Primitive } from 'reka-ui'
  import { bubbleVariants } from './variants'

  interface Props extends PrimitiveProps {
    side?: BubbleReactionsVariants['side']
    align?: BubbleReactionsVariants['align']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    side: 'bottom',
    align: 'end'
  })
  const slots = bubbleVariants()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.reactions({ side, align, class: props.class as never })"
    :data-align="align"
    :data-side="side"
    data-slot="bubble-reactions"
  >
    <slot />
  </Primitive>
</template>
