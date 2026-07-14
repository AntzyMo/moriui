import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const radioGroupVariants = tv({
  slots: {
    root: 'radio-group',
    item: 'radio-group__item',
    indicator: 'radio-group__indicator',
    indicatorMark: 'radio-group__indicator-mark'
  }
})

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>
