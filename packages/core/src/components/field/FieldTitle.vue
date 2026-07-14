<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { fieldVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = fieldVariants()
</script>

<template>
  <div :class="slots.title({ class: props.class as never })" data-slot="field-title">
    <slot />
  </div>
</template>
