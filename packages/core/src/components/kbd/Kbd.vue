<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { kbdVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = kbdVariants()
</script>

<template>
  <kbd :class="slots.base({ class: props.class as never })" data-slot="kbd">
    <slot />
  </kbd>
</template>
