<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { EmptyMediaVariants } from './variants'

  import { emptyVariants } from './variants'

  interface Props {
    variant?: EmptyMediaVariants['variant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
  })
  const slots = emptyVariants()
</script>

<template>
  <div
    :class="slots.media({ variant, class: props.class as never })"
    :data-variant="variant"
    data-slot="empty-icon"
  >
    <slot />
  </div>
</template>
