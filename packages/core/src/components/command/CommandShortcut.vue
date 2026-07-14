<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { commandVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = commandVariants()
</script>

<template>
  <span
    :class="slots.shortcut({ class: props.class as never })"
    data-slot="command-shortcut"
  >
    <slot />
  </span>
</template>
