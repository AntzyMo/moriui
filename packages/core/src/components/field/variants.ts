import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const fieldVariants = tv({
  slots: {
    base: 'field',
    content: 'field__content',
    description: 'field__description',
    error: 'field__error',
    errorList: 'field__error-list',
    errorItem: 'field__error-item',
    group: 'field-group',
    label: 'field__label',
    legend: 'field__legend',
    separator: 'field__separator',
    separatorContent: 'field__separator-content',
    set: 'field-set',
    title: 'field__title'
  },
  variants: {
    orientation: {
      vertical: { base: 'field--vertical' },
      horizontal: { base: 'field--horizontal' },
      responsive: { base: 'field--responsive' }
    },
    legendVariant: {
      legend: { legend: 'field__legend--legend' },
      label: { legend: 'field__legend--label' }
    }
  },
  defaultVariants: {
    orientation: 'vertical',
    legendVariant: 'legend'
  }
})

export type FieldVariants = VariantProps<typeof fieldVariants>
