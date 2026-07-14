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
  <span
    aria-current="page"
    aria-disabled="true"
    :class="slots.page({ class: props.class as never })"
    data-slot="breadcrumb-page"
    role="link"
  >
    <slot />
  </span>
</template>
