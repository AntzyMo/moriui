import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export const sheetVariants = tv({
  slots: {
    trigger: 'sheet__trigger',
    overlay: 'sheet__overlay',
    content: 'sheet__content',
    close: 'sheet__close',
    closeButton: 'sheet__close-button',
    header: 'sheet__header',
    footer: 'sheet__footer',
    title: 'sheet__title',
    description: 'sheet__description'
  }
})

export type SheetVariants = VariantProps<typeof sheetVariants>
