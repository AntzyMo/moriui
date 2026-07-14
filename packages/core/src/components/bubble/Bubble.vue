<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { BubbleVariants } from './variants'

  import { Primitive } from 'reka-ui'
  import { bubbleVariants } from './variants'

  interface Props extends PrimitiveProps {
    variant?: BubbleVariants['variant']
    align?: 'start' | 'end'
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    variant: 'default',
    align: 'start'
  })
  const slots = bubbleVariants()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.base({ variant, align, class: props.class as never })"
    :data-align="align"
    :data-variant="variant"
    data-slot="bubble"
  >
    <slot />
  </Primitive>
</template>
