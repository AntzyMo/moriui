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
    :class="slots.icon({ class: props.class as never })"
    aria-hidden="true"
    data-slot="marker-icon"
  >
    <slot />
  </span>
</template>
