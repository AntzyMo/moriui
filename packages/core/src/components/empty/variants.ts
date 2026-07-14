import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const emptyVariants = tv({
  slots: {
    base: 'empty',
    header: 'empty__header',
    media: 'empty__media',
    title: 'empty__title',
    description: 'empty__description',
    content: 'empty__content'
  },
  variants: {
    variant: {
      default: { media: 'empty__media--default' },
      icon: { media: 'empty__media--icon' }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type EmptyVariants = VariantProps<typeof emptyVariants>
export type EmptyMediaVariants = Pick<EmptyVariants, 'variant'>
