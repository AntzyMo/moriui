import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const bubbleVariants = tv({
  slots: {
    base: 'bubble',
    content: 'bubble__content',
    group: 'bubble-group',
    reactions: 'bubble__reactions'
  },
  variants: {
    variant: {
      default: { base: 'bubble--default' },
      secondary: { base: 'bubble--secondary' },
      muted: { base: 'bubble--muted' },
      tinted: { base: 'bubble--tinted' },
      outline: { base: 'bubble--outline' },
      ghost: { base: 'bubble--ghost' },
      destructive: { base: 'bubble--destructive' }
    },
    align: {
      start: { reactions: 'bubble__reactions--start' },
      end: {
        base: 'bubble--end',
        reactions: 'bubble__reactions--end'
      }
    },
    side: {
      top: { reactions: 'bubble__reactions--top' },
      bottom: { reactions: 'bubble__reactions--bottom' }
    }
  },
  defaultVariants: {
    variant: 'default',
    align: 'start',
    side: 'bottom'
  }
})

export const bubbleReactionsVariants = bubbleVariants

type BubbleVariantProps = VariantProps<typeof bubbleVariants>

export type BubbleVariants = Pick<BubbleVariantProps, 'variant'>
export type BubbleReactionsVariants = Pick<BubbleVariantProps, 'align' | 'side'>
