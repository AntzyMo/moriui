import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const datePickerVariants = tv({
  slots: {
    root: 'date-picker',
    field: 'date-picker__field',
    input: 'date-picker__input',
    trigger: 'date-picker__trigger',
    triggerIcon: 'date-picker__trigger-icon',
    content: 'date-picker__content',
    arrow: 'date-picker__arrow',
    calendar: 'date-picker__calendar',
    header: 'date-picker__header',
    prev: 'date-picker__prev',
    next: 'date-picker__next',
    prevIcon: 'date-picker__prev-icon',
    nextIcon: 'date-picker__next-icon',
    heading: 'date-picker__heading',
    grid: 'date-picker__grid',
    gridHead: 'date-picker__grid-head',
    gridBody: 'date-picker__grid-body',
    gridRow: 'date-picker__grid-row',
    headCell: 'date-picker__head-cell',
    cell: 'date-picker__cell',
    cellTrigger: 'date-picker__cell-trigger',
    close: 'date-picker__close',
    anchor: 'date-picker__anchor'
  }
})

export type DatePickerVariants = VariantProps<typeof datePickerVariants>
