<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CardVariants } from './variants'

  import { computed } from 'vue'
  import { cardVariants } from './variants'

  interface Props {
    size?: CardVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'default'
  })
  const slots = computed(() => cardVariants({ size: props.size }))
</script>

<template>
  <div
    :class="slots.base({ class: props.class as never })"
    :data-size="size"
    data-slot="card"
  >
    <slot />
  </div>
</template>
