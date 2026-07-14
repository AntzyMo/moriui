<script setup lang="ts">
  import type { ContextMenuRadioGroupEmits, ContextMenuRadioGroupProps } from 'reka-ui'

  import { ContextMenuRadioGroup, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<ContextMenuRadioGroupProps>()
  const emit = defineEmits<ContextMenuRadioGroupEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <ContextMenuRadioGroup v-bind="forwarded" data-slot="context-menu-radio-group">
    <slot />
  </ContextMenuRadioGroup>
</template>
