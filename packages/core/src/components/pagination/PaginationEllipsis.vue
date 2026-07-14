<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationEllipsisProps } from 'reka-ui'

  import { Ellipsis } from '@lucide/vue'
  import { PaginationEllipsis, useForwardProps } from 'reka-ui'

  import { paginationVariants } from './variants'

  interface Props extends PaginationEllipsisProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationEllipsis
    v-bind="forwarded"
    :class="slots.ellipsis({ class: props.class as never })"
    data-slot="pagination-ellipsis"
  >
    <slot>
      <Ellipsis
        :class="slots.ellipsisIcon()"
        aria-hidden="true"
        data-slot="pagination-ellipsis-icon"
      />
    </slot>
  </PaginationEllipsis>
</template>
