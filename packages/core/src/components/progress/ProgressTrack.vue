<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { progressVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = progressVariants()
</script>

<template>
  <div
    :class="slots.track({ class: props.class as never })"
    data-slot="progress-track"
  >
    <slot />
  </div>
</template>
