import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const itemVariants = tv({
  slots: {
    base: 'item',
    group: 'item-group',
    media: 'item__media',
    content: 'item__content',
    title: 'item__title',
    description: 'item__description',
    actions: 'item__actions',
    header: 'item__header',
    footer: 'item__footer',
    separator: 'item__separator'
  },
  variants: {
    variant: {
      default: { base: 'item--default' },
      outline: { base: 'item--outline' },
      muted: { base: 'item--muted' }
    },
    size: {
      default: { base: 'item--default-size' },
      sm: { base: 'item--sm' },
      xs: { base: 'item--xs' }
    },
    mediaVariant: {
      default: { media: 'item__media--default' },
      icon: { media: 'item__media--icon' },
      image: { media: 'item__media--image' }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    mediaVariant: 'default'
  }
})

export type ItemVariants = VariantProps<typeof itemVariants>
export type ItemMediaVariants = Pick<ItemVariants, 'mediaVariant'>
