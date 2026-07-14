<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxInputProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxInput, useForwardProps } from 'reka-ui'

  interface Props extends Omit<ComboboxInputProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<string>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxInput
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.input({ class: props.class as never })"
    data-slot="combobox-input"
  >
    <slot />
  </ComboboxInput>
</template>
