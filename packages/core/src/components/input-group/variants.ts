import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const inputGroupVariants = tv({
  slots: {
    base: 'input-group',
    addon: 'input-group__addon',
    button: 'input-group__button',
    input: 'input-group__input',
    text: 'input-group__text'
  },
  variants: {
    size: {
      'xs': {
        button: 'input-group__button--xs'
      },
      'sm': {
        button: 'input-group__button--sm'
      },
      'icon-xs': {
        button: 'input-group__button--icon-xs'
      },
      'icon-sm': {
        button: 'input-group__button--icon-sm'
      }
    },
    align: {
      'inline-start': {
        addon: 'input-group__addon--inline-start'
      },
      'inline-end': {
        addon: 'input-group__addon--inline-end'
      },
      'block-start': {
        addon: 'input-group__addon--block-start'
      },
      'block-end': {
        addon: 'input-group__addon--block-end'
      }
    }
  },
  defaultVariants: {
    align: 'inline-start',
    size: 'xs'
  }
})

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>
export type InputGroupAddonVariants = Pick<InputGroupVariants, 'align'>
export type InputGroupButtonVariants = Pick<InputGroupVariants, 'size'>
