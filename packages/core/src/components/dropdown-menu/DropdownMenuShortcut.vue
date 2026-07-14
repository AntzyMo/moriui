<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { dropdownMenuVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = dropdownMenuVariants()
</script>

<template>
  <span
    :class="slots.shortcut({ class: props.class as never })"
    data-slot="dropdown-menu-shortcut"
  >
    <slot />
  </span>
</template>
