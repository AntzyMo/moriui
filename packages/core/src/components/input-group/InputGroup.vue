<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { inputGroupVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = inputGroupVariants()
</script>

<template>
  <div
    :class="slots.base({ class: props.class as never })"
    data-slot="input-group"
    role="group"
  >
    <slot />
  </div>
</template>
