import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  Table as TanStackTable
} from '@tanstack/vue-table'

export interface TableColumnFilterMeta {
  placeholder?: string
}

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filter?: TableColumnFilterMeta
  }
}

export interface TableProps<TData extends RowData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  size?: 'default' | 'sm'
  selectable?: boolean
  getRowId?: (originalRow: TData, index: number, parent?: { id: string }) => string
  pageSizeOptions?: number[]
  searchPlaceholder?: string
  emptyText?: string
}

export interface TableModels {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  globalFilter: string
  pagination: PaginationState
  rowSelection: RowSelectionState
}

export type TableInstance<TData extends RowData> = TanStackTable<TData>
