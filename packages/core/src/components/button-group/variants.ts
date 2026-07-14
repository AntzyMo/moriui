import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const buttonGroupVariants = tv({
  slots: {
    base: 'button-group',
    separator: 'button-group__separator',
    text: 'button-group__text'
  },
  variants: {
    orientation: {
      horizontal: {
        base: 'button-group--horizontal'
      },
      vertical: {
        base: 'button-group--vertical'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
