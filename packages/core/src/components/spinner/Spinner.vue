<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SpinnerVariants } from './variants'

  import { spinnerVariants } from './variants'

  interface Props {
    size?: SpinnerVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'default'
  })
</script>

<template>
  <span
    :class="spinnerVariants({ size, class: props.class as never })"
    data-slot="spinner"
  />
</template>
