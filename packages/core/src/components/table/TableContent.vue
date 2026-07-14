<script setup lang="ts">
  import { FlexRender } from '@tanstack/vue-table'
  import { ArrowDown, ArrowUp, ArrowUpDown } from '@lucide/vue'

  import { tableVariants } from './variants'
  import { useTableContext } from './context'

  interface Props {
    emptyText: string
  }

  const props = defineProps<Props>()
  const { table } = useTableContext()
  const slots = tableVariants()

  function getAriaSort(columnId: string) {
    const sorted = table.getColumn(columnId)?.getIsSorted()
    return sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'
  }

  function getSortLabel(columnId: string) {
    const sorted = table.getColumn(columnId)?.getIsSorted()
    return sorted === 'asc' ? '按降序排序' : sorted === 'desc' ? '取消排序' : '按升序排序'
  }

  function handleColumnFilter(event: Event, columnId: string) {
    table.getColumn(columnId)?.setFilterValue((event.target as HTMLInputElement).value)
  }
</script>

<template>
  <div :class="slots.scrollContainer()" data-slot="table-scroll-container">
    <table :class="slots.content()" data-slot="table-content">
      <thead :class="slots.header()" data-slot="table-header">
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          :class="slots.row()"
          data-slot="table-row"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :aria-sort="getAriaSort(header.column.id)"
            :class="slots.head()"
            :colspan="header.colSpan"
            :rowspan="header.rowSpan"
            data-slot="table-head"
          >
            <template v-if="!header.isPlaceholder">
              <button
                v-if="header.column.getCanSort()"
                :aria-label="getSortLabel(header.column.id)"
                :class="slots.sortButton()"
                type="button"
                @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <FlexRender :props="header.getContext()" :render="header.column.columnDef.header" />
                <ArrowUp v-if="header.column.getIsSorted() === 'asc'" :class="slots.sortIcon()" aria-hidden="true" />
                <ArrowDown v-else-if="header.column.getIsSorted() === 'desc'" :class="slots.sortIcon()" aria-hidden="true" />
                <ArrowUpDown v-else :class="slots.sortIcon()" aria-hidden="true" />
              </button>
              <FlexRender v-else :props="header.getContext()" :render="header.column.columnDef.header" />
              <input
                v-if="header.column.columnDef.meta?.filter"
                :class="slots.columnFilter()"
                :placeholder="header.column.columnDef.meta.filter.placeholder ?? '筛选'"
                :value="String(header.column.getFilterValue() ?? '')"
                :aria-label="`筛选 ${header.column.id}`"
                data-slot="table-column-filter"
                type="search"
                @input="handleColumnFilter($event, header.column.id)"
              >
            </template>
          </th>
        </tr>
      </thead>
      <tbody :class="slots.body()" data-slot="table-body">
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :class="slots.row()"
          :data-state="row.getIsSelected() ? 'selected' : undefined"
          data-slot="table-row"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :class="slots.cell()"
            data-slot="table-cell"
          >
            <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell" />
          </td>
        </tr>
        <tr v-if="table.getRowModel().rows.length === 0" :class="slots.row()" data-slot="table-empty-row">
          <td :class="slots.empty()" :colspan="table.getVisibleLeafColumns().length" data-slot="table-empty">
            <slot name="empty" :table="table">
              {{ props.emptyText }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
