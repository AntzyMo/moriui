<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { popoverVariants } from './variants'

const slots = popoverVariants()

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="slots.header({ class: props.class as never })"
    data-slot="popover-header"
  >
    <slot />
  </div>
</template>
