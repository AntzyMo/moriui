<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { menubarVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = menubarVariants()
</script>

<template>
  <span
    :class="slots.shortcut({ class: props.class as never })"
    data-slot="menubar-shortcut"
  >
    <slot />
  </span>
</template>
