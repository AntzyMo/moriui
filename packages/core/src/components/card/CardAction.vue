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
  <div :class="slots.action({ class: props.class as never })" data-slot="card-action">
    <slot />
  </div>
</template>
