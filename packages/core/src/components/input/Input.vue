<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { inputVariants } from './variants'

  interface Props {
    defaultValue?: string
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<string>({
    default: rawProps => (rawProps as Props).defaultValue ?? ''
  })
</script>

<template>
  <input
    v-model="modelValue"
    :class="inputVariants({ class: props.class as never })"
    data-slot="input"
  >
</template>
