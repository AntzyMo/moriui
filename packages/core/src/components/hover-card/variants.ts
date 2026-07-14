import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const hoverCardVariants = tv({
  slots: {
    trigger: 'hover-card__trigger',
    content: 'hover-card__content',
    arrow: 'hover-card__arrow'
  }
})

export type HoverCardVariants = VariantProps<typeof hoverCardVariants>
