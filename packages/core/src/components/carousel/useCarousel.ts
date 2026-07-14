import { inject } from 'vue'
import { carouselContextKey } from './types'

export function useCarousel() {
  const context = inject(carouselContextKey)
  if (!context)
    throw new Error('useCarousel 必须在 <Carousel> 内使用。')
  return context
}
