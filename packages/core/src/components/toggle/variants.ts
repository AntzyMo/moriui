import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const toggleVariants = tv({
  slots: {
    root: 'toggle'
  },
  variants: {
    variant: {
      default: { root: 'toggle--default' },
      outline: { root: 'toggle--outline' }
    },
    size: {
      sm: { root: 'toggle--sm' },
      default: { root: 'toggle--default-size' },
      lg: { root: 'toggle--lg' }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export type ToggleVariants = VariantProps<typeof toggleVariants>
