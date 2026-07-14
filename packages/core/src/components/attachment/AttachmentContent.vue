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
  <div :class="slots.content({ class: props.class as never })" data-slot="attachment-content">
    <slot />
  </div>
</template>
