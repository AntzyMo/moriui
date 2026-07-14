import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const contextMenuVariants = tv({
  slots: {
    trigger: 'context-menu__trigger',
    content: 'context-menu__content',
    arrow: 'context-menu__arrow',
    group: 'context-menu__group',
    label: 'context-menu__label',
    separator: 'context-menu__separator',
    item: 'context-menu__item',
    checkboxItem: 'context-menu__item context-menu__checkbox-item',
    radioItem: 'context-menu__item context-menu__radio-item',
    itemIndicator: 'context-menu__item-indicator',
    itemIndicatorMark: 'context-menu__item-indicator-mark',
    shortcut: 'context-menu__shortcut',
    subTrigger: 'context-menu__item context-menu__sub-trigger',
    subTriggerIcon: 'context-menu__sub-trigger-icon'
  }
})

export type ContextMenuVariants = VariantProps<typeof contextMenuVariants>
