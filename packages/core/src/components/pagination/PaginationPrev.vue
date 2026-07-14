<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationPrevProps } from 'reka-ui'

  import { ChevronLeft } from '@lucide/vue'
  import { PaginationPrev, useForwardProps } from 'reka-ui'

  import { paginationVariants } from './variants'

  interface Props extends PaginationPrevProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationPrev
    v-bind="forwarded"
    :class="slots.prev({ class: props.class as never })"
    data-slot="pagination-prev"
  >
    <slot>
      <ChevronLeft
        :class="slots.prevIcon()"
        aria-hidden="true"
        data-icon="inline-start"
        data-slot="pagination-prev-icon"
      />
      <span :class="slots.prevText()">上一页</span>
    </slot>
  </PaginationPrev>
</template>
