<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuSubTriggerProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { ContextMenuSubTrigger, useForwardProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'

  interface Props extends ContextMenuSubTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="forwarded"
    :class="slots.subTrigger({ class: props.class as never })"
    data-slot="context-menu-sub-trigger"
  >
    <slot />
    <slot name="indicator">
      <ChevronRight
        :class="slots.subTriggerIcon()"
        aria-hidden="true"
        data-slot="context-menu-sub-trigger-icon"
      />
    </slot>
  </ContextMenuSubTrigger>
</template>
