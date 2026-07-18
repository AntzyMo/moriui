<script setup lang="ts">
  import type { ContextMenuRootEmits, ContextMenuRootProps } from 'reka-ui'

  import ContextMenuOpenBridge from './ContextMenuOpenBridge.vue'
  import { ContextMenuRoot, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<ContextMenuRootProps>()
  const emit = defineEmits<ContextMenuRootEmits>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <ContextMenuRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model:open="open"
    data-slot="context-menu"
  >
    <ContextMenuOpenBridge :open="open">
      <slot v-bind="slotProps" />
    </ContextMenuOpenBridge>
  </ContextMenuRoot>
</template>
