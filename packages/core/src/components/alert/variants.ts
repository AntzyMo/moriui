import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const alertVariants = tv({
  slots: {
    base: 'alert',
    title: 'alert__title',
    description: 'alert__description',
    action: 'alert__action'
  },
  variants: {
    variant: {
      default: 'alert--default',
      destructive: 'alert--destructive'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type AlertVariants = VariantProps<typeof alertVariants>
