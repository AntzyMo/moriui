import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const paginationVariants = tv({
  slots: {
    root: 'pagination',
    list: 'pagination__list',
    item: 'pagination__item',
    ellipsis: 'pagination__ellipsis',
    ellipsisIcon: 'pagination__ellipsis-icon',
    first: 'pagination__first',
    prev: 'pagination__prev',
    prevText: 'pagination__prev-text',
    next: 'pagination__next',
    nextText: 'pagination__next-text',
    last: 'pagination__last',
    firstIcon: 'pagination__first-icon',
    prevIcon: 'pagination__prev-icon',
    nextIcon: 'pagination__next-icon',
    lastIcon: 'pagination__last-icon'
  }
})

export type PaginationVariants = VariantProps<typeof paginationVariants>
