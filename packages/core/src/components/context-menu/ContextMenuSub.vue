<script setup lang="ts">
  import type { ContextMenuSubEmits, ContextMenuSubProps } from 'reka-ui'

  import { ContextMenuSub, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<ContextMenuSubProps>()
  const emit = defineEmits<ContextMenuSubEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <ContextMenuSub v-bind="forwarded" data-slot="context-menu-sub">
    <slot />
  </ContextMenuSub>
</template>
