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
  <nav aria-label="breadcrumb" :class="slots.base({ class: props.class as never })" data-slot="breadcrumb">
    <slot />
  </nav>
</template>
