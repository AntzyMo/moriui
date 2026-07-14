import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const markerVariants = tv({
  slots: {
    base: 'marker',
    icon: 'marker__icon',
    content: 'marker__content'
  },
  variants: {
    variant: {
      default: { base: 'marker--default' },
      border: { base: 'marker--border' },
      separator: { base: 'marker--separator' }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type MarkerVariants = VariantProps<typeof markerVariants>
