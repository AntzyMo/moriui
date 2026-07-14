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
  <div :class="slots.content({ class: props.class as never })" data-slot="field-content">
    <slot />
  </div>
</template>
