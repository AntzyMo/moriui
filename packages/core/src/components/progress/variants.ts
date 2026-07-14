import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const progressVariants = tv({
  slots: {
    root: 'progress',
    track: 'progress__track',
    indicator: 'progress__indicator',
    label: 'progress__label',
    value: 'progress__value'
  }
})

export type ProgressVariants = VariantProps<typeof progressVariants>
