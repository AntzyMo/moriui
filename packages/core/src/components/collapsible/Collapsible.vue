<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CollapsibleRootProps } from 'reka-ui'

  import { collapsibleVariants } from './variants'
  import { CollapsibleRoot, useForwardProps } from 'reka-ui'

  interface Props extends Omit<CollapsibleRootProps, 'open'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const open = defineModel<boolean | undefined>('open', { default: undefined })
  const forwarded = useForwardProps(props)
  const slots = collapsibleVariants()
</script>

<template>
  <CollapsibleRoot
    v-slot="slotProps"
    v-model:open="open"
    v-bind="forwarded"
    :class="slots.root({ class: props.class as never })"
    data-slot="collapsible"
  >
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
