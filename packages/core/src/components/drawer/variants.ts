import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const drawerVariants = tv({
  slots: {
    trigger: 'drawer__trigger',
    overlay: 'drawer__overlay',
    content: 'drawer__content',
    close: 'drawer__close',
    handle: 'drawer__handle',
    header: 'drawer__header',
    footer: 'drawer__footer',
    title: 'drawer__title',
    description: 'drawer__description'
  }
})

export type DrawerVariants = VariantProps<typeof drawerVariants>
