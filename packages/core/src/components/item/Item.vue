<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { ItemVariants } from './variants'

  import { computed } from 'vue'
  import { Primitive } from 'reka-ui'

  import { itemVariants } from './variants'

  interface Props extends PrimitiveProps {
    variant?: ItemVariants['variant']
    size?: ItemVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    variant: 'default',
    size: 'default'
  })
  const slots = computed(() => itemVariants({
    variant: props.variant,
    size: props.size
  }))
</script>

<template>
  <Primitive
    v-bind="props"
    :class="slots.base({ class: props.class as never })"
    :data-size="size"
    :data-variant="variant"
    data-slot="item"
  >
    <slot />
  </Primitive>
</template>
