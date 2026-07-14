<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AccordionContentProps } from 'reka-ui'

  import { AccordionContent } from 'reka-ui'
  import { accordionContentVariants } from './variants'

  interface Props extends AccordionContentProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = accordionContentVariants()
</script>

<template>
  <AccordionContent
    v-bind="props"
    :class="slots.base()"
    data-slot="accordion-content"
  >
    <div
      :class="slots.inner({ class: props.class as never })"
      data-slot="accordion-content-inner"
    >
      <slot />
    </div>
  </AccordionContent>
</template>
