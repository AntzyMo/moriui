<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { ChevronRight } from '@lucide/vue'
  import { breadcrumbVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = breadcrumbVariants()
</script>

<template>
  <li
    aria-hidden="true"
    :class="slots.separator({ class: props.class as never })"
    data-slot="breadcrumb-separator"
    role="presentation"
  >
    <slot>
      <ChevronRight :class="slots.separatorIcon()" />
    </slot>
  </li>
</template>
