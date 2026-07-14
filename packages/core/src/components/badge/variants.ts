import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const badgeVariants = tv({
  base: 'badge',
  variants: {
    variant: {
      default: 'badge--default',
      secondary: 'badge--secondary',
      destructive: 'badge--destructive',
      outline: 'badge--outline',
      ghost: 'badge--ghost',
      link: 'badge--link'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type BadgeVariants = VariantProps<typeof badgeVariants>
