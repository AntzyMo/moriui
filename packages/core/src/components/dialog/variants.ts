import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const dialogVariants = tv({
  slots: {
    trigger: 'dialog__trigger',
    overlay: 'dialog__overlay',
    content: 'dialog__content',
    close: 'dialog__close',
    closeButton: 'dialog__close-button',
    header: 'dialog__header',
    footer: 'dialog__footer',
    title: 'dialog__title',
    description: 'dialog__description'
  }
})

export type DialogVariants = VariantProps<typeof dialogVariants>
