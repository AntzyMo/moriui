import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const spinnerVariants = tv({
  base: 'spinner',
  variants: {
    size: {
      xs: 'spinner--xs',
      sm: 'spinner--sm',
      default: 'spinner--default',
      lg: 'spinner--lg'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export type SpinnerVariants = VariantProps<typeof spinnerVariants>
