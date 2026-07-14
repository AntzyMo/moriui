import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel'

export type CarouselApi = EmblaCarouselType
export type CarouselOptions = EmblaOptionsType
export type CarouselPlugin = EmblaPluginType
export type CarouselOrientation = 'horizontal' | 'vertical'
export interface CarouselAutoplayOptions {
  delay?: number
  jump?: boolean
  stopOnFocusIn?: boolean
  stopOnInteraction?: boolean
  stopOnLastSnap?: boolean
  stopOnMouseEnter?: boolean
}

export interface CarouselContext {
  api: Readonly<Ref<CarouselApi | undefined>>
  carouselRef: Ref<HTMLElement | undefined>
  canScrollNext: Readonly<Ref<boolean>>
  canScrollPrev: Readonly<Ref<boolean>>
  isAutoplayEnabled: ComputedRef<boolean>
  isAutoplayPlaying: Readonly<Ref<boolean>>
  orientation: ComputedRef<CarouselOrientation>
  selectedIndex: Readonly<Ref<number>>
  slideCount: Readonly<Ref<number>>
  scrollNext: () => void
  scrollPrev: () => void
  scrollTo: (index: number) => void
  playAutoplay: () => void
  stopAutoplay: () => void
  toggleAutoplay: () => void
}

export const carouselContextKey: InjectionKey<CarouselContext> = Symbol('carousel')
