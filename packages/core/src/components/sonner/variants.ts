import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const sonnerVariants = tv({
  slots: {
    base: 'sonner',
    toast: 'sonner__toast'
  }
})

export type SonnerVariants = VariantProps<typeof sonnerVariants>
