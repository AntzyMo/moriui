<script setup lang="ts">
  import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'

  import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'

  type Props = Omit<PopoverRootProps, 'open'>

  const props = defineProps<Props>()
  const emits = defineEmits<PopoverRootEmits>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model:open="open"
    data-slot="popover"
  >
    <slot v-bind="slotProps" />
  </PopoverRoot>
</template>
