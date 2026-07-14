<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { fieldVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = fieldVariants()
</script>

<template>
  <fieldset :class="slots.set({ class: props.class as never })" data-slot="field-set">
    <slot />
  </fieldset>
</template>
