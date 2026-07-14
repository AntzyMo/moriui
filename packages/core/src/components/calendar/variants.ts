import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const calendarVariants = tv({
  slots: {
    root: 'calendar',
    header: 'calendar__header',
    navigation: 'calendar__navigation',
    prev: 'calendar__prev',
    next: 'calendar__next',
    prevIcon: 'calendar__prev-icon',
    nextIcon: 'calendar__next-icon',
    heading: 'calendar__heading',
    months: 'calendar__months',
    grid: 'calendar__grid',
    gridHead: 'calendar__grid-head',
    gridBody: 'calendar__grid-body',
    row: 'calendar__row',
    headCell: 'calendar__head-cell',
    cell: 'calendar__cell',
    cellTrigger: 'calendar__cell-trigger'
  }
})

export type CalendarVariants = VariantProps<typeof calendarVariants>
