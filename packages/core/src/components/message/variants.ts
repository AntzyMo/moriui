import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const messageVariants = tv({
  slots: {
    avatar: 'message-avatar',
    base: 'message',
    content: 'message__content',
    footer: 'message__footer',
    group: 'message-group',
    header: 'message__header'
  },
  variants: {
    align: {
      end: { base: 'message--end' },
      start: {}
    }
  },
  defaultVariants: {
    align: 'start'
  }
})

export const messageAvatarVariants = tv({
  slots: {
    base: 'message-avatar'
  }
})

type MessageVariantProps = VariantProps<typeof messageVariants>

export type MessageVariants = Pick<MessageVariantProps, 'align'>
