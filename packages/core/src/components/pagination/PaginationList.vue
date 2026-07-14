<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationListProps } from 'reka-ui'

  import { paginationVariants } from './variants'
  import { PaginationList, useForwardProps } from 'reka-ui'

  interface Props extends PaginationListProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationList
    #default="slotProps"
    v-bind="forwarded"
    :class="slots.list({ class: props.class as never })"
    data-slot="pagination-list"
  >
    <slot v-bind="slotProps" />
  </PaginationList>
</template>
