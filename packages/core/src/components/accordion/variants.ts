import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const accordionVariants = tv({
  base: 'accordion'
})

export const accordionItemVariants = tv({
  base: 'accordion__item'
})

export const accordionTriggerVariants = tv({
  base: 'accordion__trigger'
})

export const accordionIconVariants = tv({
  slots: {
    base: 'accordion__icon',
    chevron: 'accordion__icon-chevron'
  }
})

export const accordionContentVariants = tv({
  slots: {
    base: 'accordion__content',
    inner: 'accordion__content-inner'
  }
})

export type AccordionVariants = VariantProps<typeof accordionVariants>
export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>
export type AccordionTriggerVariants = VariantProps<typeof accordionTriggerVariants>
export type AccordionIconVariants = VariantProps<typeof accordionIconVariants>
export type AccordionContentVariants = VariantProps<typeof accordionContentVariants>
