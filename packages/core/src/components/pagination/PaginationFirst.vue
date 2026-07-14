<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationFirstProps } from 'reka-ui'

  import { ChevronsLeft } from '@lucide/vue'
  import { PaginationFirst, useForwardProps } from 'reka-ui'

  import { paginationVariants } from './variants'

  interface Props extends PaginationFirstProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationFirst
    v-bind="forwarded"
    :class="slots.first({ class: props.class as never })"
    data-slot="pagination-first"
  >
    <slot>
      <ChevronsLeft :class="slots.firstIcon()" aria-hidden="true" data-slot="pagination-first-icon" />
    </slot>
  </PaginationFirst>
</template>
