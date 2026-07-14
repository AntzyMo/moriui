import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const avatarVariants = tv({
  slots: {
    base: 'avatar',
    image: 'avatar__image',
    fallback: 'avatar__fallback',
    badge: 'avatar__badge',
    group: 'avatar-group',
    groupCount: 'avatar-group__count'
  },
  variants: {
    size: {
      sm: { base: 'avatar--sm' },
      default: { base: 'avatar--default-size' },
      lg: { base: 'avatar--lg' }
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export type AvatarVariants = VariantProps<typeof avatarVariants>
