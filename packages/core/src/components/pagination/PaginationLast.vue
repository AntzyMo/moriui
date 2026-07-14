<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationLastProps } from 'reka-ui'

  import { ChevronsRight } from '@lucide/vue'
  import { PaginationLast, useForwardProps } from 'reka-ui'

  import { paginationVariants } from './variants'

  interface Props extends PaginationLastProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationLast
    v-bind="forwarded"
    :class="slots.last({ class: props.class as never })"
    data-slot="pagination-last"
  >
    <slot>
      <ChevronsRight :class="slots.lastIcon()" aria-hidden="true" data-slot="pagination-last-icon" />
    </slot>
  </PaginationLast>
</template>
