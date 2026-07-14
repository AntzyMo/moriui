<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { textareaVariants } from './variants'

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
  <textarea
    v-model="modelValue"
    :class="textareaVariants({ class: props.class as never })"
    data-slot="textarea"
  />
</template>
