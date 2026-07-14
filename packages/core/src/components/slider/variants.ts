import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const sliderVariants = tv({
  slots: {
    root: 'slider',
    track: 'slider__track',
    range: 'slider__range',
    thumb: 'slider__thumb'
  }
})

export type SliderVariants = VariantProps<typeof sliderVariants>
