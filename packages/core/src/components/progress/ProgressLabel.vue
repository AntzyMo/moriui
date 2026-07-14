<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { progressVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = progressVariants()
</script>

<template>
  <span
    :class="slots.label({ class: props.class as never })"
    data-slot="progress-label"
  >
    <slot />
  </span>
</template>
