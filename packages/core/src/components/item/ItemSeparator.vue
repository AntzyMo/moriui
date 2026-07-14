<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { itemVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = itemVariants()
</script>

<template>
  <div
    :class="slots.separator({ class: props.class as never })"
    aria-orientation="horizontal"
    data-slot="item-separator"
    role="separator"
  />
</template>
