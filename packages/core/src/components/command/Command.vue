<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'

  import { commandVariants } from './variants'
  import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<ComboboxRootProps, 'defaultOpen' | 'defaultValue' | 'modelValue' | 'open'> {
    class?: HTMLAttributes['class']
  }

  type Emits = Pick<ComboboxRootEmits, 'highlight'>

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = commandVariants()
</script>

<template>
  <ComboboxRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="slots.root({ class: props.class as never })"
    model-value=""
    :open="true"
    data-slot="command"
  >
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
