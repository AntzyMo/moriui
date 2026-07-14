import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const tooltipVariants = tv({
  slots: {
    trigger: 'tooltip__trigger',
    content: 'tooltip__content',
    arrow: 'tooltip__arrow'
  }
})

export type TooltipVariants = VariantProps<typeof tooltipVariants>
