import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const popoverVariants = tv({
  slots: {
    trigger: 'popover__trigger',
    content: 'popover__content',
    anchor: 'popover__anchor',
    header: 'popover__header',
    title: 'popover__title',
    description: 'popover__description'
  }
})

export type PopoverVariants = VariantProps<typeof popoverVariants>
