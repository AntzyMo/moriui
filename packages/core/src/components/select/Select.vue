<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AcceptableValue, SelectRootProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectRoot, useForwardProps } from 'reka-ui'

  interface Props extends Omit<SelectRootProps, 'modelValue' | 'open'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<AcceptableValue | AcceptableValue[]>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <div
    :class="slots.root({ class: props.class as never })"
    data-slot="select"
  >
    <SelectRoot
      #default="slotProps"
      v-bind="forwarded"
      v-model="modelValue"
      v-model:open="open"
    >
      <slot v-bind="slotProps" />
    </SelectRoot>
  </div>
</template>
