<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { Ellipsis } from '@lucide/vue'
  import { breadcrumbVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = breadcrumbVariants()
</script>

<template>
  <span
    aria-hidden="true"
    :class="slots.ellipsis({ class: props.class as never })"
    data-slot="breadcrumb-ellipsis"
    role="presentation"
  >
    <slot>
      <Ellipsis :class="slots.ellipsisIcon()" />
    </slot>
  </span>
</template>
