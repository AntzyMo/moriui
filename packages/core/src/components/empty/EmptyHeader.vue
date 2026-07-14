<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { emptyVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = emptyVariants()
</script>

<template>
  <div :class="slots.header({ class: props.class as never })" data-slot="empty-header">
    <slot />
  </div>
</template>
