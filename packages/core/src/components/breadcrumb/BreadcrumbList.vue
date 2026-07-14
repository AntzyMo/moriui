<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { breadcrumbVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = breadcrumbVariants()
</script>

<template>
  <ol :class="slots.list({ class: props.class as never })" data-slot="breadcrumb-list">
    <slot />
  </ol>
</template>
