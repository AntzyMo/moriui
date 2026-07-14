import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const kbdVariants = tv({
  slots: {
    base: 'kbd',
    group: 'kbd-group'
  }
})

export type KbdVariants = VariantProps<typeof kbdVariants>
