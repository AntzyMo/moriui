import type { CarouselApi } from '../src/components/carousel/types'

import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Carousel from '../src/components/carousel/Carousel.vue'
import CarouselItem from '../src/components/carousel/CarouselItem.vue'
import CarouselNext from '../src/components/carousel/CarouselNext.vue'
import CarouselContent from '../src/components/carousel/CarouselContent.vue'
import CarouselAutoplay from '../src/components/carousel/CarouselAutoplay.vue'
import CarouselPrevious from '../src/components/carousel/CarouselPrevious.vue'
import CarouselIndicators from '../src/components/carousel/CarouselIndicators.vue'

import './style.css'

async function settle() {
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

function createFixture(props: Record<string, unknown> = {}) {
  const api = ref<CarouselApi>()
  const Fixture = defineComponent({
    setup: () => () => h(Carousel, {
      'aria-label': '发布状态轮播',
      'onInitApi': (value: CarouselApi) => {
        api.value = value
      },
      'style': 'width: 360px;',
      ...props
    }, {
      default: () => [
        h(CarouselContent, {}, {
          default: () => ['一', '二', '三'].map(label => h(CarouselItem, { key: label }, {
            default: () => h('div', { style: 'height: 120px;' }, label)
          }))
        }),
        h(CarouselPrevious),
        h(CarouselNext),
        h(CarouselIndicators),
        h(CarouselAutoplay)
      ]
    })
  })
  return { api, page: render(Fixture) }
}

it('渲染组合槽位、无障碍语义和 Embla API', async () => {
  const { api, page } = createFixture({ 'class': 'custom-carousel', 'data-testid': 'carousel' })
  await settle()

  const carousel = page.container.querySelector('[data-slot="carousel"]') as HTMLElement
  expect(api.value).toBeDefined()
  expect(carousel.classList).toContain('carousel')
  expect(carousel.classList).toContain('custom-carousel')
  expect(carousel.dataset.testid).toBe('carousel')
  expect(carousel.getAttribute('aria-roledescription')).toBe('carousel')
  expect(page.container.querySelector('[data-slot="carousel-content"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="carousel-track"]')).not.toBeNull()
  expect(page.container.querySelectorAll('[data-slot="carousel-item"]')).toHaveLength(3)
  expect(page.container.querySelectorAll('[data-slot="carousel-indicator"]')).toHaveLength(3)
  expect(api.value?.scrollSnapList()).toHaveLength(3)
})

it('支持垂直方向、方向键导航和前后按钮边界状态', async () => {
  const { api, page } = createFixture({ opts: { duration: 1 }, orientation: 'vertical', style: 'height: 360px; width: 360px;' })
  await settle()

  const carousel = page.container.querySelector('[data-slot="carousel"]') as HTMLElement
  const previous = page.container.querySelector('[data-slot="carousel-previous"]') as HTMLButtonElement
  const next = page.container.querySelector('[data-slot="carousel-next"]') as HTMLButtonElement
  expect(carousel.dataset.orientation).toBe('vertical')
  expect(previous.disabled).toBe(true)
  expect(api.value?.canScrollNext()).toBe(true)
  carousel.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await new Promise(resolve => setTimeout(resolve, 80))
  expect(api.value?.selectedScrollSnap()).toBe(1)
  expect(previous.disabled).toBe(false)
  next.click()
  await settle()
  expect(api.value?.selectedScrollSnap()).toBe(2)
})

it('自动播放默认关闭，启用后可由控制按钮暂停', async () => {
  const disabled = createFixture()
  await settle()
  expect(disabled.page.container.querySelector('[data-slot="carousel"]')?.getAttribute('data-autoplay')).toBe('disabled')

  const enabled = createFixture({ autoplay: { delay: 100 }, opts: { loop: true } })
  await settle()
  const control = enabled.page.container.querySelector('[data-slot="carousel-autoplay"]') as HTMLButtonElement
  expect(enabled.api.value?.plugins().autoplay?.isPlaying()).toBe(true)
  control.click()
  await nextTick()
  expect(enabled.api.value?.plugins().autoplay?.isPlaying()).toBe(false)
  expect(control.dataset.state).toBe('paused')
})
