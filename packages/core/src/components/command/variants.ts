import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const commandVariants = tv({
  slots: {
    root: 'command',
    inputWrapper: 'command__input-wrapper',
    inputGroup: 'command__input-group',
    inputIcon: 'command__input-icon',
    input: 'command__input',
    list: 'command__list',
    empty: 'command__empty',
    group: 'command__group',
    groupHeading: 'command__group-heading',
    item: 'command__item',
    separator: 'command__separator',
    shortcut: 'command__shortcut',
    dialogOverlay: 'command-dialog__overlay',
    dialogContent: 'command-dialog__content',
    dialogTitle: 'command-dialog__title',
    dialogDescription: 'command-dialog__description'
  }
})

export type CommandVariants = VariantProps<typeof commandVariants>
