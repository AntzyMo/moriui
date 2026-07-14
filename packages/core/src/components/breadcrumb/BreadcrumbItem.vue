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
  <li :class="slots.item({ class: props.class as never })" data-slot="breadcrumb-item">
    <slot />
  </li>
</template>
