<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AccordionTriggerProps } from 'reka-ui'

  import { accordionTriggerVariants } from './variants'
  import { AccordionHeader, AccordionTrigger } from 'reka-ui'

  interface Props extends AccordionTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
</script>

<template>
  <AccordionHeader class="accordion__header" data-slot="accordion-header">
    <AccordionTrigger
      v-bind="props"
      :class="accordionTriggerVariants({ class: props.class as never })"
      data-slot="accordion-trigger"
    >
      <slot />
    </AccordionTrigger>
  </AccordionHeader>
</template>
