import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const toggleGroupVariants = tv({
  slots: {
    root: 'toggle-group',
    item: 'toggle-group__item'
  },
  variants: {
    variant: {
      default: { item: 'toggle-group__item--default' },
      outline: { item: 'toggle-group__item--outline' }
    },
    size: {
      sm: { item: 'toggle-group__item--sm' },
      default: { item: 'toggle-group__item--default-size' },
      lg: { item: 'toggle-group__item--lg' }
    },
    orientation: {
      horizontal: { root: 'toggle-group--horizontal' },
      vertical: { root: 'toggle-group--vertical' }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    orientation: 'horizontal'
  }
})

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>
