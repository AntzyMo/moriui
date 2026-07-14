<script setup lang="ts">
  import type { HoverCardRootEmits, HoverCardRootProps } from 'reka-ui'

  import { HoverCardRoot, useForwardPropsEmits } from 'reka-ui'

  type Props = Omit<HoverCardRootProps, 'open'>

  const props = withDefaults(defineProps<Props>(), {
    openDelay: 300
  })
  const emits = defineEmits<HoverCardRootEmits>()
  const open = defineModel<boolean>('open')
  const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <HoverCardRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model:open="open"
    data-slot="hover-card"
  >
    <slot v-bind="slotProps" />
  </HoverCardRoot>
</template>
