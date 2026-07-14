<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertVariants } from './variants'

  import { computed } from 'vue'
  import { alertVariants } from './variants'

  interface Props {
    variant?: AlertVariants['variant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
  })
  const slots = computed(() => alertVariants({ variant: props.variant }))
</script>

<template>
  <div
    :class="slots.base({ class: props.class as never })"
    data-slot="alert"
    role="alert"
  >
    <slot />
  </div>
</template>
