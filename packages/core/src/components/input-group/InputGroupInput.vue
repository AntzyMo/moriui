<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import Input from '../input/Input.vue'
  import { inputGroupVariants } from './variants'

  interface Props {
    defaultValue?: string
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<string>({
    default: rawProps => (rawProps as Props).defaultValue ?? ''
  })
  const slots = inputGroupVariants()
</script>

<template>
  <Input
    v-model="modelValue"
    :class="slots.input({ class: props.class as never })"
    data-slot="input-group-control"
  />
</template>
