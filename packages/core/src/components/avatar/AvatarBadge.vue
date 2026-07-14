<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { avatarVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = avatarVariants()
</script>

<template>
  <span :class="slots.badge({ class: props.class as never })" data-slot="avatar-badge">
    <slot />
  </span>
</template>
