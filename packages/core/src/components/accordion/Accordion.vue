<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AccordionRootProps } from 'reka-ui'

  import { accordionVariants } from './variants'
  import { AccordionRoot, useForwardProps } from 'reka-ui'

  interface Props extends Omit<AccordionRootProps<string | string[]>, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const modelValue = defineModel<string | string[]>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    v-model="modelValue"
    v-bind="forwarded"
    :class="accordionVariants({ class: props.class as never })"
    data-slot="accordion"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
