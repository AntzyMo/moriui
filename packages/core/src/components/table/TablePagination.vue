<script setup lang="ts">
  import { computed } from 'vue'
  import { tableVariants } from './variants'
  import { useTableContext } from './context'
  import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationList,
    PaginationNext,
    PaginationPrev
  } from '../pagination'

  interface Props {
    pageSizeOptions: number[]
  }

  const props = defineProps<Props>()
  const { table } = useTableContext()
  const slots = tableVariants()
  const page = computed({
    get: () => table.getState().pagination.pageIndex + 1,
    set: value => table.setPageIndex(value - 1)
  })

  function handlePageSize(event: Event) {
    table.setPageSize(Number((event.target as HTMLSelectElement).value))
  }
</script>

<template>
  <div :class="slots.pagination()" data-slot="table-pagination">
    <slot v-if="$slots.pagination" name="pagination" :table="table" />
    <template v-else>
      <p :class="slots.paginationSummary()" data-slot="table-pagination-summary">
        共 {{ table.getFilteredRowModel().rows.length }} 条
      </p>
      <Pagination v-model:page="page" :items-per-page="table.getState().pagination.pageSize" :total="table.getFilteredRowModel().rows.length">
        <PaginationList #default="{ items }">
          <PaginationPrev />
          <template v-for="(item, index) in items" :key="`${item.type}-${index}`">
            <PaginationItem v-if="item.type === 'page'" :value="item.value" />
            <PaginationEllipsis v-else />
          </template>
          <PaginationNext />
        </PaginationList>
      </Pagination>
      <label>
        <span class="sr-only">每页数量</span>
        <select
          :class="slots.pageSize()"
          :value="table.getState().pagination.pageSize"
          aria-label="每页数量"
          data-slot="table-page-size"
          @change="handlePageSize"
        >
          <option v-for="size in props.pageSizeOptions" :key="size" :value="size">
            {{ size }} 条/页
          </option>
        </select>
      </label>
    </template>
  </div>
</template>
