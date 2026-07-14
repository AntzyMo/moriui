import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const inputOTPVariants = tv({
  slots: {
    root: 'input-otp',
    group: 'input-otp__group',
    slot: 'input-otp__slot',
    separator: 'input-otp__separator',
    separatorMark: 'input-otp__separator-mark'
  }
})

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>
