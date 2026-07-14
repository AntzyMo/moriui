<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TabsTriggerProps } from 'reka-ui'

  import { tabsVariants } from './variants'
  import { TabsTrigger, useForwardProps } from 'reka-ui'

  interface Props extends TabsTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = tabsVariants()
</script>

<template>
  <TabsTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="tabs-trigger"
  >
    <slot />
  </TabsTrigger>
</template>
