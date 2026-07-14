<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TabsContentProps } from 'reka-ui'

  import { tabsVariants } from './variants'
  import { TabsContent, useForwardProps } from 'reka-ui'

  interface Props extends TabsContentProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = tabsVariants()
</script>

<template>
  <TabsContent
    v-bind="forwarded"
    :class="slots.content({ class: props.class as never })"
    data-slot="tabs-content"
  >
    <slot />
  </TabsContent>
</template>
