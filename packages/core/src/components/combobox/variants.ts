import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const comboboxVariants = tv({
  slots: {
    root: 'combobox',
    anchor: 'combobox__anchor',
    input: 'combobox__input',
    trigger: 'combobox__trigger',
    triggerIcon: 'combobox__trigger-icon',
    content: 'combobox__content',
    arrow: 'combobox__arrow',
    viewport: 'combobox__viewport',
    item: 'combobox__item',
    itemIndicator: 'combobox__item-indicator',
    itemIndicatorMark: 'combobox__item-indicator-mark',
    group: 'combobox__group',
    label: 'combobox__label',
    separator: 'combobox__separator',
    empty: 'combobox__empty',
    cancel: 'combobox__cancel',
    cancelIcon: 'combobox__cancel-icon',
    virtualizer: 'combobox__virtualizer'
  }
})

export type ComboboxVariants = VariantProps<typeof comboboxVariants>
