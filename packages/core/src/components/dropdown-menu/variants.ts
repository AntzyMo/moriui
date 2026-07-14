import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const dropdownMenuVariants = tv({
  slots: {
    trigger: 'dropdown-menu__trigger',
    content: 'dropdown-menu__content',
    arrow: 'dropdown-menu__arrow',
    group: 'dropdown-menu__group',
    label: 'dropdown-menu__label',
    separator: 'dropdown-menu__separator',
    item: 'dropdown-menu__item',
    checkboxItem: 'dropdown-menu__item dropdown-menu__checkbox-item',
    radioItem: 'dropdown-menu__item dropdown-menu__radio-item',
    itemIndicator: 'dropdown-menu__item-indicator',
    itemIndicatorMark: 'dropdown-menu__item-indicator-mark',
    shortcut: 'dropdown-menu__shortcut',
    subTrigger: 'dropdown-menu__item dropdown-menu__sub-trigger',
    subTriggerIcon: 'dropdown-menu__sub-trigger-icon'
  }
})

export type DropdownMenuVariants = VariantProps<typeof dropdownMenuVariants>
