import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const switchVariants = tv({
  slots: {
    root: 'switch',
    thumb: 'switch__thumb'
  },
  variants: {
    size: {
      default: { root: 'switch--default' },
      sm: { root: 'switch--sm' }
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export type SwitchVariants = VariantProps<typeof switchVariants>
