import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const checkboxVariants = tv({
  slots: {
    root: 'checkbox',
    indicator: 'checkbox__indicator',
    indicatorMark: 'checkbox__indicator-mark'
  }
})

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
