<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { contextMenuVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = contextMenuVariants()
</script>

<template>
  <span
    :class="slots.shortcut({ class: props.class as never })"
    data-slot="context-menu-shortcut"
  >
    <slot />
  </span>
</template>
