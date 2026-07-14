<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ItemMediaVariants } from './variants'

  import { itemVariants } from './variants'

  interface Props {
    variant?: ItemMediaVariants['mediaVariant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
  })
  const slots = itemVariants()
</script>

<template>
  <div
    :class="slots.media({ mediaVariant: variant, class: props.class as never })"
    :data-variant="variant"
    data-slot="item-media"
  >
    <slot />
  </div>
</template>
