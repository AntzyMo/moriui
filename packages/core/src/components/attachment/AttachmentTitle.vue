<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { attachmentVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = attachmentVariants()
</script>

<template>
  <span :class="slots.title({ class: props.class as never })" data-slot="attachment-title">
    <slot />
  </span>
</template>
