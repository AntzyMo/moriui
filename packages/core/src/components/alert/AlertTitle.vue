<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { alertVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = alertVariants()
</script>

<template>
  <div :class="slots.title({ class: props.class as never })" data-slot="alert-title">
    <slot />
  </div>
</template>
