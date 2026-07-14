import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const messageScrollerVariants = tv({
  slots: {
    root: 'message-scroller',
    viewport: 'message-scroller__viewport',
    content: 'message-scroller__content',
    item: 'message-scroller__item',
    button: 'message-scroller__button',
    spacer: 'message-scroller__spacer'
  },
  variants: {
    direction: {
      start: { button: 'message-scroller__button--start' },
      end: { button: 'message-scroller__button--end' }
    }
  },
  defaultVariants: { direction: 'end' }
})

export type MessageScrollerVariants = VariantProps<typeof messageScrollerVariants>
