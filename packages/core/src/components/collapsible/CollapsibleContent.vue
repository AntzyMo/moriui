<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CollapsibleContentProps } from 'reka-ui'

  import { CollapsibleContent } from 'reka-ui'
  import { collapsibleVariants } from './variants'

  interface Props extends CollapsibleContentProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = collapsibleVariants()
</script>

<template>
  <CollapsibleContent
    v-bind="props"
    :class="slots.content({ class: props.class as never })"
    data-slot="collapsible-content"
  >
    <slot />
  </CollapsibleContent>
</template>
