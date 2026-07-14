import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const menubarVariants = tv({
  slots: {
    root: 'menubar',
    trigger: 'menubar__trigger',
    content: 'menubar__content',
    arrow: 'menubar__arrow',
    group: 'menubar__group',
    label: 'menubar__label',
    separator: 'menubar__separator',
    item: 'menubar__item',
    checkboxItem: 'menubar__item menubar__checkbox-item',
    radioItem: 'menubar__item menubar__radio-item',
    itemIndicator: 'menubar__item-indicator',
    itemIndicatorMark: 'menubar__item-indicator-mark',
    shortcut: 'menubar__shortcut',
    subTrigger: 'menubar__item menubar__sub-trigger',
    subTriggerIcon: 'menubar__sub-trigger-icon'
  }
})

export type MenubarVariants = VariantProps<typeof menubarVariants>
