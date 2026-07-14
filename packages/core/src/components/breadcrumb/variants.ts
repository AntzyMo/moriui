import { tv } from 'tailwind-variants'

export const breadcrumbVariants = tv({
  slots: {
    base: 'breadcrumb',
    list: 'breadcrumb__list',
    item: 'breadcrumb__item',
    link: 'breadcrumb__link',
    page: 'breadcrumb__page',
    separator: 'breadcrumb__separator',
    separatorIcon: 'breadcrumb__separator-icon',
    ellipsis: 'breadcrumb__ellipsis',
    ellipsisIcon: 'breadcrumb__ellipsis-icon'
  }
})
