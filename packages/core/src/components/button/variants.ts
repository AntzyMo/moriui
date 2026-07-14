import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'button',
  variants: {
    variant: {
      default: 'button--default',
      outline: 'button--outline',
      secondary: 'button--secondary',
      ghost: 'button--ghost',
      destructive: 'button--destructive',
      link: 'button--link'
    },
    size: {
      'xs': 'button--xs',
      'sm': 'button--sm',
      'default': 'button--default-size',
      'lg': 'button--lg',
      'icon-xs': 'button--icon-xs',
      'icon-sm': 'button--icon-sm',
      'icon': 'button--icon',
      'icon-lg': 'button--icon-lg'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
