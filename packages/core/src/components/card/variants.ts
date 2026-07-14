import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const cardVariants = tv({
  slots: {
    base: 'card',
    header: 'card__header',
    title: 'card__title',
    description: 'card__description',
    action: 'card__action',
    content: 'card__content',
    footer: 'card__footer'
  },
  variants: {
    size: {
      default: { base: 'card--default-size' },
      sm: { base: 'card--sm' }
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export type CardVariants = VariantProps<typeof cardVariants>
