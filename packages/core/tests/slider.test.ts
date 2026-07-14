import { expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import Slider from '../src/components/slider/Slider.vue'
import SliderRange from '../src/components/slider/SliderRange.vue'
import SliderThumb from '../src/components/slider/SliderThumb.vue'
import SliderTrack from '../src/components/slider/SliderTrack.vue'
import { sliderVariants } from '../src/components/slider/variants'

import './style.css'

function sliderContent(values: number[]) {
  return [
    h(SliderTrack, { class: 'custom-track' }, {
      default: () => h(SliderRange, { class: 'custom-range' })
    }),
    ...values.map(value => h(SliderThumb, {
      'key': value,
      'aria-label': `值 ${value}`,
      'class': 'custom-thumb'
    }))
  ]
}

it('渲染组合槽位、透传属性和完整的根作用域插槽', async () => {
  const page = render(Slider, {
    attrs: {
      'data-testid': 'volume-slider',
      'aria-describedby': 'volume-help'
    },
    props: {
      class: 'custom-slider',
      defaultValue: [40],
      name: 'volume',
      required: true
    },
    slots: {
      default: ({ modelValue }: { modelValue: number[] }) => [
        h('output', { 'data-model-value': modelValue.join(',') }),
        ...sliderContent(modelValue)
      ]
    }
  })
  const root = page.container.querySelector('[data-slot="slider"]') as HTMLElement
  const track = page.container.querySelector('[data-slot="slider-track"]') as HTMLElement
  const range = page.container.querySelector('[data-slot="slider-range"]') as HTMLElement
  const thumb = page.container.querySelector('[data-slot="slider-thumb"]') as HTMLElement

  await nextTick()

  expect(root.classList).toContain('slider')
  expect(root.classList).toContain('custom-slider')
  expect(root.dataset.orientation).toBe('horizontal')
  expect(root.dataset.testid).toBe('volume-slider')
  expect(root.getAttribute('aria-describedby')).toBe('volume-help')
  expect(track.classList).toContain('slider__track')
  expect(track.classList).toContain('custom-track')
  expect(range.classList).toContain('slider__range')
  expect(range.classList).toContain('custom-range')
  expect(thumb.classList).toContain('slider__thumb')
  expect(thumb.classList).toContain('custom-thumb')
  expect(thumb.getAttribute('role')).toBe('slider')
  expect(thumb.getAttribute('aria-valuenow')).toBe('40')
  expect(page.container.querySelector('output')?.dataset.modelValue).toBe('40')
  expect(getComputedStyle(track).height).toBe('4px')
  expect(getComputedStyle(thumb).width).toBe('16px')
  expect(Number.parseFloat(getComputedStyle(thumb).borderRadius)).toBeGreaterThan(1000000)
})

it('支持指针点击、受控 v-model、键盘调节和提交事件', async () => {
  const value = shallowRef([20])
  const onValueCommit = vi.fn()
  const Fixture = defineComponent({
    setup: () => () => h(Slider, {
      'modelValue': value.value,
      'min': 0,
      'max': 100,
      'onUpdate:modelValue': (nextValue: number[] | undefined) => {
        value.value = nextValue ?? []
      },
      onValueCommit
    }, {
      default: () => sliderContent(value.value)
    })
  })
  const page = render(Fixture)
  const slider = page.container.querySelector('[data-slider-impl]') as HTMLElement
  const getThumb = () => page.container.querySelector('[data-slot="slider-thumb"]') as HTMLElement
  let pointerCaptured = false

  Object.assign(slider, {
    getBoundingClientRect: () => new DOMRect(0, 0, 100, 16),
    setPointerCapture: () => {
      pointerCaptured = true
    },
    hasPointerCapture: () => pointerCaptured,
    releasePointerCapture: () => {
      pointerCaptured = false
    }
  })

  slider.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true,
    clientX: 50,
    pointerId: 1
  }))
  await nextTick()
  slider.dispatchEvent(new PointerEvent('pointerup', {
    bubbles: true,
    clientX: 50,
    pointerId: 1
  }))
  await nextTick()
  expect(value.value).toEqual([50])
  expect(onValueCommit).toHaveBeenCalledWith([50])

  getThumb().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  await nextTick()
  expect(value.value).toEqual([51])

  getThumb().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'PageUp' }))
  await nextTick()
  expect(value.value).toEqual([61])

  getThumb().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Home' }))
  await nextTick()
  expect(value.value).toEqual([0])

  getThumb().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'End' }))
  await nextTick()
  expect(value.value).toEqual([100])
})

it('支持多拇指间距、垂直方向、RTL/inverted 和禁用状态', async () => {
  const constrained = shallowRef([30, 70])
  const disabled = shallowRef([50])
  const Fixture = defineComponent({
    setup: () => () => h('div', { 'data-theme': 'dark' }, [
      h(Slider, {
        'modelValue': constrained.value,
        'minStepsBetweenThumbs': 50,
        'onUpdate:modelValue': (nextValue: number[] | undefined) => {
          constrained.value = nextValue ?? []
        }
      }, { default: () => sliderContent(constrained.value) }),
      h(Slider, {
        defaultValue: [40],
        orientation: 'vertical',
        dir: 'rtl',
        inverted: true,
        class: 'h-40'
      }, { default: () => sliderContent([40]) }),
      h(Slider, {
        'modelValue': disabled.value,
        'disabled': true,
        'onUpdate:modelValue': (nextValue: number[] | undefined) => {
          disabled.value = nextValue ?? []
        }
      }, { default: () => sliderContent(disabled.value) })
    ])
  })
  const page = render(Fixture)
  const roots = page.container.querySelectorAll('[data-slot="slider"]')
  const thumbs = page.container.querySelectorAll('[data-slot="slider-thumb"]')
  const constrainedThumb = thumbs[0] as HTMLElement
  const vertical = roots[1] as HTMLElement
  const disabledRoot = roots[2] as HTMLElement
  const disabledThumb = thumbs[3] as HTMLElement

  constrainedThumb.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  await nextTick()
  expect(constrained.value).toEqual([30, 70])

  expect(vertical.dataset.orientation).toBe('vertical')
  expect(vertical.classList).toContain('h-40')
  expect(getComputedStyle(vertical.querySelector('[data-slot="slider-track"]') as HTMLElement).width).toBe('4px')
  expect(disabledRoot.hasAttribute('data-disabled')).toBe(true)
  expect(disabledThumb.hasAttribute('data-disabled')).toBe(true)

  disabledThumb.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  await nextTick()
  expect(disabled.value).toEqual([50])
  expect(getComputedStyle(disabledRoot).opacity).toBe(
    getComputedStyle(disabledRoot).getPropertyValue('--disabled-opacity').trim()
  )
})

it('为所有可见槽位生成稳定类名', () => {
  const slots = sliderVariants()

  expect(slots.root()).toContain('slider')
  expect(slots.track()).toContain('slider__track')
  expect(slots.range()).toContain('slider__range')
  expect(slots.thumb()).toContain('slider__thumb')
})
