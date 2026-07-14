<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { markerVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = markerVariants()
</script>

<template>
  <span
    :class="slots.content({ class: props.class as never })"
    data-slot="marker-content"
  >
    <slot />
  </span>
</template>
