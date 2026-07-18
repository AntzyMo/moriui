<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<ComboboxRootProps, 'modelValue' | 'open'> {
    class?: HTMLAttributes['class']
  }

  type Emits = Pick<ComboboxRootEmits, 'highlight'>

  const props = withDefaults(defineProps<Props>(), {
    openOnClick: true
  })
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<AcceptableValue | AcceptableValue[]>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    v-model:open="open"
    :class="slots.root({ class: props.class as never })"
    data-slot="combobox"
  >
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
