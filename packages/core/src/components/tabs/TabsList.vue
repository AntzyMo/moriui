<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TabsListProps } from 'reka-ui'

  import { tabsVariants } from './variants'
  import { TabsList, useForwardProps } from 'reka-ui'

  interface Props extends TabsListProps {
    class?: HTMLAttributes['class']
    variant?: 'default' | 'line'
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
  })
  const forwarded = useForwardProps(() => {
    const { variant: _variant, ...rekaProps } = props
    return rekaProps
  })
  const slots = tabsVariants({ variant: props.variant })
</script>

<template>
  <TabsList
    v-bind="forwarded"
    :class="slots.list({ class: props.class as never })"
    :data-variant="props.variant"
    data-slot="tabs-list"
  >
    <slot />
  </TabsList>
</template>
