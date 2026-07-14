import { afterEach, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { cleanup, render } from 'vitest-browser-vue'

import ScrollArea from '../src/components/scroll-area/ScrollArea.vue'
import ScrollAreaThumb from '../src/components/scroll-area/ScrollAreaThumb.vue'
import ScrollAreaScrollbar from '../src/components/scroll-area/ScrollAreaScrollbar.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createContent() {
  return h('div', { style: { height: '24rem', width: '32rem' } }, '可滚动内容')
}

it('默认组合纵向 Viewport、滚动条与 Thumb，并透传 Reka 属性和调用方类名', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(ScrollArea, {
      'aria-label': '发布记录',
      'class': 'custom-scroll-area',
      'dir': 'rtl',
      'style': { height: '10rem', width: '16rem' },
      'type': 'always'
    }, { default: createContent })
  })
  const page = render(Fixture)
  await nextTick()

  const root = page.container.querySelector('[data-slot="scroll-area"]') as HTMLElement
  const viewport = page.container.querySelector('[data-slot="scroll-area-viewport"]') as HTMLElement
  const scrollbar = page.container.querySelector('[data-slot="scroll-area-scrollbar"]') as HTMLElement
  const thumb = page.container.querySelector('[data-slot="scroll-area-thumb"]') as HTMLElement

  expect(root.classList).toContain('scroll-area')
  expect(root.classList).toContain('custom-scroll-area')
  expect(root.dataset.orientation).toBe('vertical')
  expect(root.getAttribute('aria-label')).toBe('发布记录')
  expect(root.getAttribute('dir')).toBe('rtl')
  expect(getComputedStyle(root).overflow).toBe('visible')
  expect(viewport.tabIndex).toBe(0)
  expect(scrollbar.dataset.orientation).toBe('vertical')
  expect(scrollbar.classList).toContain('scroll-area__scrollbar')
  expect(thumb.classList).toContain('scroll-area__thumb')
  expect(getComputedStyle(scrollbar).width).toBe('10px')
})

it('orientation 控制横向与双轴滚动条，并在双轴模式组合 Corner', async () => {
  const originalResizeObserver = window.ResizeObserver
  class ImmediateResizeObserver {
    constructor(private readonly callback: ResizeObserverCallback) {}

    observe(target: Element) {
      this.callback([{ target } as ResizeObserverEntry], this as unknown as ResizeObserver)
    }

    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    value: ImmediateResizeObserver
  })
  const Fixture = defineComponent({
    setup: () => () => h('div', [
      h(ScrollArea, {
        orientation: 'horizontal',
        style: { height: '10rem', width: '16rem' },
        type: 'always'
      }, { default: createContent }),
      h(ScrollArea, {
        orientation: 'both',
        style: { height: '10rem', width: '16rem' },
        type: 'always'
      }, { default: createContent })
    ])
  })
  try {
    const page = render(Fixture)
    await nextTick()

    const [horizontal, both] = Array.from(page.container.querySelectorAll('[data-slot="scroll-area"]')) as HTMLElement[]
    expect(horizontal.dataset.orientation).toBe('horizontal')
    expect(horizontal.querySelector('[data-orientation="vertical"]')).toBeNull()
    expect(horizontal.querySelector('[data-orientation="horizontal"]')).not.toBeNull()

    expect(both.dataset.orientation).toBe('both')
    expect(both.querySelectorAll('[data-slot="scroll-area-scrollbar"]')).toHaveLength(2)
    expect(both.querySelector('[data-orientation="vertical"]')).not.toBeNull()
    expect(both.querySelector('[data-orientation="horizontal"]')).not.toBeNull()
    expect(both.querySelector('[data-slot="scroll-area-corner"]')).not.toBeNull()
  } finally {
    cleanup()
    Object.defineProperty(window, 'ResizeObserver', {
      configurable: true,
      value: originalResizeObserver
    })
  }
})

it('具名 scrollbar 插槽支持替换默认滚动条与 Thumb', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(ScrollArea, {
      style: { height: '10rem', width: '16rem' },
      type: 'always'
    }, {
      default: createContent,
      scrollbar: () => h(ScrollAreaScrollbar, { orientation: 'vertical' }, {
        default: () => h(ScrollAreaThumb, { class: 'custom-scroll-area-thumb' })
      })
    })
  })
  const page = render(Fixture)
  await nextTick()

  const scrollbars = page.container.querySelectorAll('[data-slot="scroll-area-scrollbar"]')
  const thumb = page.container.querySelector('[data-slot="scroll-area-thumb"]') as HTMLElement
  expect(scrollbars).toHaveLength(1)
  expect(thumb.classList).toContain('custom-scroll-area-thumb')
})

it('hover 模式继续由 Reka 管理可见性，并在深色主题下消费 Nova Token', async () => {
  const Fixture = defineComponent({
    setup: () => () => h('div', { 'data-theme': 'dark' }, [
      h(ScrollArea, {
        'data-testid': 'hover-scroll-area',
        'style': { height: '10rem', width: '16rem' }
      }, { default: createContent })
    ])
  })
  const page = render(Fixture)
  const root = page.container.querySelector('[data-testid="hover-scroll-area"]') as HTMLElement

  root.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
  await new Promise(resolve => setTimeout(resolve, 120))

  const thumb = page.container.querySelector('[data-slot="scroll-area-thumb"]') as HTMLElement
  const border = getComputedStyle(thumb).getPropertyValue('--border').trim().replace('10%', '0.1')
  expect(thumb).not.toBeNull()
  expect(getComputedStyle(thumb).backgroundColor).toBe(border)
})
