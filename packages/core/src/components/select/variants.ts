import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const selectVariants = tv({
  slots: {
    root: 'select',
    trigger: 'select__trigger',
    triggerIcon: 'select__trigger-icon',
    value: 'select__value',
    content: 'select__content',
    viewport: 'select__viewport',
    group: 'select__group',
    label: 'select__label',
    item: 'select__item',
    itemText: 'select__item-text',
    itemIndicator: 'select__item-indicator',
    itemIndicatorMark: 'select__item-indicator-mark',
    separator: 'select__separator',
    scrollUpButton: 'select__scroll-up-button',
    scrollUpButtonIcon: 'select__scroll-up-button-icon',
    scrollDownButton: 'select__scroll-down-button',
    scrollDownButtonIcon: 'select__scroll-down-button-icon'
  }
})

export type SelectVariants = VariantProps<typeof selectVariants>
