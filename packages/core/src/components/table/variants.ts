import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const tableVariants = tv({
  slots: {
    base: 'table',
    toolbar: 'table__toolbar',
    search: 'table__search',
    scrollContainer: 'table__scroll-container',
    content: 'table__content',
    header: 'table__header',
    head: 'table__head',
    sortButton: 'table__sort-button',
    sortIcon: 'table__sort-icon',
    columnFilter: 'table__column-filter',
    body: 'table__body',
    row: 'table__row',
    cell: 'table__cell',
    selection: 'table__selection',
    selectionControl: 'table__selection-control',
    empty: 'table__empty',
    pagination: 'table__pagination',
    paginationSummary: 'table__pagination-summary',
    pageSize: 'table__page-size'
  },
  variants: {
    size: {
      default: { base: 'table--default-size' },
      sm: { base: 'table--sm' }
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export type TableVariants = VariantProps<typeof tableVariants>
