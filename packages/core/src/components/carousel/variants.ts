import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const carouselVariants = tv({
  slots: {
    base: 'carousel',
    viewport: 'carousel__viewport',
    content: 'carousel__content',
    item: 'carousel__item',
    previous: 'carousel__previous',
    previousIcon: 'carousel__previous-icon',
    next: 'carousel__next',
    nextIcon: 'carousel__next-icon',
    indicators: 'carousel__indicators',
    indicator: 'carousel__indicator',
    autoplay: 'carousel__autoplay',
    autoplayPlayIcon: 'carousel__autoplay-play-icon',
    autoplayPauseIcon: 'carousel__autoplay-pause-icon'
  },
  variants: { orientation: { horizontal: { base: 'carousel--horizontal' }, vertical: { base: 'carousel--vertical' } } },
  defaultVariants: { orientation: 'horizontal' }
})

export type CarouselVariants = VariantProps<typeof carouselVariants>
