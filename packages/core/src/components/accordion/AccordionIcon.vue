<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { ChevronDown } from '@lucide/vue'
  import { accordionIconVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = accordionIconVariants()
</script>

<template>
  <span
    :class="slots.base({ class: props.class as never })"
    data-slot="accordion-icon"
  >
    <slot>
      <ChevronDown :class="slots.chevron()" aria-hidden="true" data-slot="accordion-icon-chevron" />
    </slot>
  </span>
</template>
