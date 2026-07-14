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
  <div :class="slots.groupCount({ class: props.class as never })" data-slot="avatar-group-count">
    <slot />
  </div>
</template>
