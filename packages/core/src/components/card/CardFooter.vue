<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { cardVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = cardVariants()
</script>

<template>
  <div :class="slots.footer({ class: props.class as never })" data-slot="card-footer">
    <slot />
  </div>
</template>
