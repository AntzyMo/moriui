<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TabsRootProps } from 'reka-ui'

  import { tabsVariants } from './variants'
  import { TabsRoot, useForwardProps } from 'reka-ui'

  interface Props extends Omit<TabsRootProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const modelValue = defineModel<TabsRootProps['modelValue']>()
  const forwarded = useForwardProps(props)
  const slots = tabsVariants()
</script>

<template>
  <TabsRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    data-slot="tabs"
  >
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>
