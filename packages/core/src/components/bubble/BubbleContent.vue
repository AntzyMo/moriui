<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { bubbleVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div'
  })
  const slots = bubbleVariants()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.content({ class: props.class as never })"
    data-slot="bubble-content"
  >
    <slot />
  </Primitive>
</template>
