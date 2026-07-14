<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { MarkerVariants } from './variants'

  import { computed } from 'vue'
  import { Primitive } from 'reka-ui'

  import { markerVariants } from './variants'

  interface Props extends PrimitiveProps {
    variant?: MarkerVariants['variant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    variant: 'default'
  })
  const slots = computed(() => markerVariants({ variant: props.variant }))
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.base({ class: props.class as never })"
    :data-variant="variant"
    data-slot="marker"
  >
    <slot />
  </Primitive>
</template>
