<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CollapsibleTriggerProps } from 'reka-ui'

  import { collapsibleVariants } from './variants'
  import { CollapsibleTrigger, injectCollapsibleRootContext, useId } from 'reka-ui'

  interface Props extends CollapsibleTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const rootContext = injectCollapsibleRootContext()
  rootContext.contentId ||= useId(undefined, 'reka-collapsible-content')
  const slots = collapsibleVariants()
</script>

<template>
  <CollapsibleTrigger
    v-bind="props"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="collapsible-trigger"
  >
    <slot />
  </CollapsibleTrigger>
</template>
