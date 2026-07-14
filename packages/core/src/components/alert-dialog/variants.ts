import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const alertDialogVariants = tv({
  slots: {
    trigger: 'alert-dialog__trigger',
    overlay: 'alert-dialog__overlay',
    content: 'alert-dialog__content',
    header: 'alert-dialog__header',
    media: 'alert-dialog__media',
    title: 'alert-dialog__title',
    description: 'alert-dialog__description',
    footer: 'alert-dialog__footer',
    action: 'alert-dialog__action',
    cancel: 'alert-dialog__cancel'
  },
  variants: {
    contentSize: {
      default: { content: 'alert-dialog__content--default' },
      sm: { content: 'alert-dialog__content--sm' }
    }
  },
  defaultVariants: {
    contentSize: 'default'
  }
})

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>
