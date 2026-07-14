<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationListItemProps } from 'reka-ui'

  import { paginationVariants } from './variants'
  import { PaginationListItem, useForwardProps } from 'reka-ui'

  interface Props extends PaginationListItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationListItem
    v-bind="forwarded"
    :class="slots.item({ class: props.class as never })"
    data-slot="pagination-item"
  >
    <slot>{{ value }}</slot>
  </PaginationListItem>
</template>
