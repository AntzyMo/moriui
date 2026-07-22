<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { popoverVariants } from './variants'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const slots = popoverVariants()
</script>

<template>
  <div
    :class="slots.header({ class: props.class as never })"
    data-slot="popover-header"
  >
    <slot />
  </div>
</template>
