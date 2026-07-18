<script setup lang="ts">
  import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'

  import { TooltipRoot, useForwardPropsEmits } from 'reka-ui'

  type Props = Omit<TooltipRootProps, 'open'>

  const props = defineProps<Props>()
  const emits = defineEmits<TooltipRootEmits>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model:open="open"
    data-slot="tooltip"
  >
    <slot v-bind="slotProps" />
  </TooltipRoot>
</template>
