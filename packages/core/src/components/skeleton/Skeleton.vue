<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { skeletonVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div'
  })
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="skeletonVariants({ class: props.class as never })"
    data-slot="skeleton"
  >
    <slot />
  </Primitive>
</template>
