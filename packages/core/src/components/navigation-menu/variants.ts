import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const navigationMenuVariants = tv({
  slots: {
    root: 'navigation-menu',
    list: 'navigation-menu__list',
    item: 'navigation-menu__item',
    trigger: 'navigation-menu__trigger',
    content: 'navigation-menu__content',
    link: 'navigation-menu__link',
    indicator: 'navigation-menu__indicator',
    indicatorMark: 'navigation-menu__indicator-mark',
    viewportWrapper: 'navigation-menu__viewport-wrapper',
    viewport: 'navigation-menu__viewport',
    sub: 'navigation-menu__sub'
  }
})

export type NavigationMenuVariants = VariantProps<typeof navigationMenuVariants>
