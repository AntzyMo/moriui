<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationNextProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { PaginationNext, useForwardProps } from 'reka-ui'

  import { paginationVariants } from './variants'

  interface Props extends PaginationNextProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationNext
    v-bind="forwarded"
    :class="slots.next({ class: props.class as never })"
    data-slot="pagination-next"
  >
    <slot>
      <span :class="slots.nextText()">下一页</span>
      <ChevronRight
        :class="slots.nextIcon()"
        aria-hidden="true"
        data-icon="inline-end"
        data-slot="pagination-next-icon"
      />
    </slot>
  </PaginationNext>
</template>
