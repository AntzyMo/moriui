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
    :class="slots.group({ class: props.class as never })"
    data-slot="item-group"
    role="list"
  >
    <slot />
  </div>
</template>
