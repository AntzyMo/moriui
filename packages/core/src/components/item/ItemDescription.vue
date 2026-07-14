<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { itemVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = itemVariants()
</script>

<template>
  <p :class="slots.description({ class: props.class as never })" data-slot="item-description">
    <slot />
  </p>
</template>
