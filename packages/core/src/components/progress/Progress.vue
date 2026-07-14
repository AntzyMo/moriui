<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ProgressRootProps } from 'reka-ui'

  import { progressVariants } from './variants'
  import { ProgressRoot, useForwardProps } from 'reka-ui'

  export interface ProgressProps extends Omit<ProgressRootProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<ProgressProps>()
  const modelValue = defineModel<number | null>()
  const forwarded = useForwardProps(props)
  const slots = progressVariants()
</script>

<template>
  <ProgressRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    data-slot="progress"
  >
    <slot v-bind="slotProps" />
  </ProgressRoot>
</template>
