import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const resizableVariants = tv({
  slots: {
    group: 'resizable',
    panel: 'resizable__panel',
    handle: 'resizable__handle',
    grip: 'resizable__grip'
  }
})

export type ResizableVariants = VariantProps<typeof resizableVariants>
