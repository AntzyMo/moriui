<script setup lang="ts" generic="TData extends RowData">
  import type { HTMLAttributes } from 'vue'
  import type { TableProps } from './types'
  import type {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    RowData,
    RowSelectionState,
    SortingState,
    Updater
  } from '@tanstack/vue-table'

  import { computed, h, useSlots } from 'vue'
  import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable
  } from '@tanstack/vue-table'

  import { tableVariants } from './variants'
  import TableContent from './TableContent.vue'
  import TableToolbar from './TableToolbar.vue'
  import { provideTableContext } from './context'
  import TablePagination from './TablePagination.vue'
  import TableSelectionCheckbox from './TableSelectionCheckbox.vue'

  export interface TableComponentProps<TData extends RowData> extends TableProps<TData> {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<TableComponentProps<TData>>(), {
    size: 'default',
    selectable: false,
    pageSizeOptions: () => [10, 20, 30, 40, 50],
    searchPlaceholder: '搜索全部列…',
    emptyText: '没有结果。'
  })
  const sorting = defineModel<SortingState>('sorting', { default: () => [] })
  const columnFilters = defineModel<ColumnFiltersState>('columnFilters', { default: () => [] })
  const globalFilter = defineModel<string>('globalFilter', { default: '' })
  const pagination = defineModel<PaginationState>('pagination', {
    default: () => ({ pageIndex: 0, pageSize: 10 })
  })
  const rowSelection = defineModel<RowSelectionState>('rowSelection', { default: () => ({}) })
  const contentSlots = useSlots()
  const tableData = computed(() => props.data)
  const slots = computed(() => tableVariants({ size: props.size }))

  function resolveUpdater<T>(updater: Updater<T>, value: T) {
    return updater instanceof Function ? updater(value) : updater
  }

  const selectionColumn: ColumnDef<TData> = {
    id: '__selection',
    enableColumnFilter: false,
    enableSorting: false,
    header: context => h(TableSelectionCheckbox, {
      checked: context.table.getIsAllPageRowsSelected(),
      indeterminate: context.table.getIsSomePageRowsSelected(),
      label: '选择当前页',
      onChange: checked => context.table.toggleAllPageRowsSelected(checked)
    }),
    cell: context => h(TableSelectionCheckbox, {
      checked: context.row.getIsSelected(),
      label: '选择此行',
      onChange: checked => context.row.toggleSelected(checked)
    })
  }
  const columns = computed(() => props.selectable ? [selectionColumn, ...props.columns] : props.columns)

  const table = useVueTable({
    data: tableData,
    get columns() {
      return columns.value
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: props.getRowId,
    enableRowSelection: props.selectable,
    state: {
      get sorting() {
        return sorting.value
      },
      get columnFilters() {
        return columnFilters.value
      },
      get globalFilter() {
        return globalFilter.value
      },
      get pagination() {
        return pagination.value
      },
      get rowSelection() {
        return rowSelection.value
      }
    },
    onSortingChange: updater => {
      sorting.value = resolveUpdater(updater, sorting.value)
    },
    onColumnFiltersChange: updater => {
      columnFilters.value = resolveUpdater(updater, columnFilters.value)
    },
    onGlobalFilterChange: updater => {
      globalFilter.value = resolveUpdater(updater, globalFilter.value)
    },
    onPaginationChange: updater => {
      pagination.value = resolveUpdater(updater, pagination.value)
    },
    onRowSelectionChange: updater => {
      rowSelection.value = resolveUpdater(updater, rowSelection.value)
    }
  })

  provideTableContext({ table })
</script>

<template>
  <section
    :class="slots.base({ class: props.class as never })"
    :data-size="props.size"
    data-slot="table"
  >
    <TableToolbar :search-placeholder="props.searchPlaceholder">
      <template #toolbar>
        <slot name="toolbar" :table="table" />
      </template>
    </TableToolbar>
    <TableContent :empty-text="props.emptyText">
      <template v-if="contentSlots.empty" #empty>
        <slot name="empty" :table="table" />
      </template>
    </TableContent>
    <TablePagination :page-size-options="props.pageSizeOptions">
      <template v-if="contentSlots.pagination" #pagination>
        <slot name="pagination" :table="table" />
      </template>
    </TablePagination>
  </section>
</template>
