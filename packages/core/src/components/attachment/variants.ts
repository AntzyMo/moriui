import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done'

export const attachmentVariants = tv({
  slots: {
    base: 'attachment',
    media: 'attachment__media',
    content: 'attachment__content',
    title: 'attachment__title',
    description: 'attachment__description',
    actions: 'attachment__actions',
    action: 'attachment__action',
    trigger: 'attachment__trigger',
    group: 'attachment-group'
  },
  variants: {
    size: {
      xs: { base: 'attachment--xs' },
      sm: { base: 'attachment--sm' },
      default: { base: 'attachment--default-size' }
    },
    orientation: {
      horizontal: { base: 'attachment--horizontal' },
      vertical: { base: 'attachment--vertical' }
    },
    variant: {
      icon: { media: 'attachment__media--icon' },
      image: { media: 'attachment__media--image' }
    }
  },
  defaultVariants: {
    size: 'default',
    orientation: 'horizontal',
    variant: 'icon'
  }
})

export type AttachmentVariants = VariantProps<typeof attachmentVariants>
export type AttachmentMediaVariants = Pick<AttachmentVariants, 'variant'>
