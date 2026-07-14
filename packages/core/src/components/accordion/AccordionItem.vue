<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AccordionItemProps } from 'reka-ui'

  import { accordionItemVariants } from './variants'
  import { AccordionItem, useForwardProps } from 'reka-ui'

  interface Props extends Omit<AccordionItemProps, 'asChild'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <AccordionItem
    #default="slotProps"
    v-bind="forwarded"
    :class="accordionItemVariants({ class: props.class as never })"
    data-slot="accordion-item"
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
