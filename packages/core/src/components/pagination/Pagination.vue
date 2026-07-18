<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PaginationRootProps } from 'reka-ui'

  import { paginationVariants } from './variants'
  import { PaginationRoot, useForwardProps } from 'reka-ui'

  interface Props extends Omit<PaginationRootProps, 'page'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const page = defineModel<number>('page')
  const forwarded = useForwardProps(props)
  const slots = paginationVariants()
</script>

<template>
  <PaginationRoot
    v-slot="slotProps"
    v-model:page="page"
    v-bind="forwarded"
    :class="slots.root({ class: props.class as never })"
    data-slot="pagination"
  >
    <slot v-bind="slotProps" />
  </PaginationRoot>
</template>
