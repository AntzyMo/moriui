<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { FieldVariants } from './variants'

  import { computed } from 'vue'
  import { fieldVariants } from './variants'

  interface Props {
    variant?: FieldVariants['legendVariant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'legend'
  })
  const slots = computed(() => fieldVariants({ legendVariant: props.variant }))
</script>

<template>
  <legend
    :class="slots.legend({ class: props.class as never })"
    :data-variant="variant"
    data-slot="field-legend"
  >
    <slot />
  </legend>
</template>
