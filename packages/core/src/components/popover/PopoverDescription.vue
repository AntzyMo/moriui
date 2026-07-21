<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { popoverVariants } from './variants'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const slots = popoverVariants()
</script>

<template>
  <p
    :class="slots.description({ class: props.class as never })"
    data-slot="popover-description"
  >
    <slot />
  </p>
</template>
