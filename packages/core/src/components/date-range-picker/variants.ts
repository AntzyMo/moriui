import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const dateRangePickerVariants = tv({
  slots: {
    root: 'date-range-picker',
    field: 'date-range-picker__field',
    input: 'date-range-picker__input',
    trigger: 'date-range-picker__trigger',
    triggerIcon: 'date-range-picker__trigger-icon',
    content: 'date-range-picker__content',
    arrow: 'date-range-picker__arrow',
    calendar: 'date-range-picker__calendar',
    header: 'date-range-picker__header',
    prev: 'date-range-picker__prev',
    next: 'date-range-picker__next',
    prevIcon: 'date-range-picker__prev-icon',
    nextIcon: 'date-range-picker__next-icon',
    heading: 'date-range-picker__heading',
    grid: 'date-range-picker__grid',
    gridHead: 'date-range-picker__grid-head',
    gridBody: 'date-range-picker__grid-body',
    gridRow: 'date-range-picker__grid-row',
    headCell: 'date-range-picker__head-cell',
    cell: 'date-range-picker__cell',
    cellTrigger: 'date-range-picker__cell-trigger',
    close: 'date-range-picker__close',
    anchor: 'date-range-picker__anchor'
  }
})

export type DateRangePickerVariants = VariantProps<typeof dateRangePickerVariants>
