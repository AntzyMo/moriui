import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const typographyVariants = tv({
  slots: {
    base: 'typography'
  },
  variants: {
    type: {
      'body': { base: 'typography--body' },
      'body-sm': { base: 'typography--body-sm' },
      'body-xs': { base: 'typography--body-xs' },
      'code': { base: 'typography--code' },
      'h1': { base: 'typography--h1' },
      'h2': { base: 'typography--h2' },
      'h3': { base: 'typography--h3' },
      'h4': { base: 'typography--h4' },
      'h5': { base: 'typography--h5' },
      'h6': { base: 'typography--h6' }
    },
    align: {
      start: { base: 'typography--align-start' },
      center: { base: 'typography--align-center' },
      end: { base: 'typography--align-end' },
      justify: { base: 'typography--align-justify' }
    },
    color: {
      default: { base: 'typography--color-default' },
      muted: { base: 'typography--color-muted' }
    },
    weight: {
      normal: { base: 'typography--weight-normal' },
      medium: { base: 'typography--weight-medium' },
      semibold: { base: 'typography--weight-semibold' },
      bold: { base: 'typography--weight-bold' }
    },
    truncate: {
      true: { base: 'typography--truncate' }
    }
  },
  defaultVariants: {
    type: 'body',
    align: 'start',
    color: 'default'
  }
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
