import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Marker from '../src/components/marker/Marker.vue'
import MarkerIcon from '../src/components/marker/MarkerIcon.vue'
import { markerVariants } from '../src/components/marker/variants'
import MarkerContent from '../src/components/marker/MarkerContent.vue'

import './style.css'

it('默认渲染展示性容器，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Marker, {
    attrs: {
      'aria-label': '已切换分支',
      'data-testid': 'branch-marker',
      onClick
    },
    props: { class: 'custom-marker' },
    slots: { default: '已切换到新分支' }
  })
  const marker = page.container.querySelector('[data-slot="marker"]') as HTMLElement

  expect(marker.tagName).toBe('DIV')
  expect(marker.dataset.variant).toBe('default')
  expect(marker.classList).toContain('marker')
  expect(marker.classList).toContain('marker--default')
  expect(marker.classList).toContain('custom-marker')
  expect(marker.getAttribute('aria-label')).toBe('已切换分支')
  expect(marker.dataset.testid).toBe('branch-marker')
  expect(marker.getAttribute('role')).toBeNull()

  marker.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('由调用方显式提供状态语义', () => {
  const page = render(Marker, {
    attrs: { role: 'status' },
    slots: { default: '正在整理对话' }
  })

  expect(page.container.querySelector('[data-slot="marker"]')?.getAttribute('role')).toBe('status')
})

it.each(['default', 'border', 'separator'] as const)('应用 %s 变体和数据属性', variant => {
  const page = render(Marker, { props: { variant } })
  const marker = page.container.querySelector('[data-slot="marker"]') as HTMLElement

  expect(marker.dataset.variant).toBe(variant)
  expect(marker.classList).toContain(`marker--${variant}`)
})

it('变体映射为根、图标和内容提供稳定类', () => {
  const slots = markerVariants({ variant: 'separator' })

  expect(slots.base()).toContain('marker')
  expect(slots.base()).toContain('marker--separator')
  expect(slots.icon()).toContain('marker__icon')
  expect(slots.content()).toContain('marker__content')
})

it('组合图标与内容槽，并隐藏装饰性图标', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Marker,
        {},
        {
          default: () => [
            h(
              MarkerIcon,
              { class: 'custom-marker-icon' },
              {
                default: () => h('svg', { viewBox: '0 0 24 24' })
              }
            ),
            h(
              MarkerContent,
              { class: 'custom-marker-content' },
              {
                default: () => '已探索 4 个文件'
              }
            )
          ]
        }
      )
  })
  const page = render(Fixture)
  const icon = page.container.querySelector('[data-slot="marker-icon"]') as HTMLElement
  const content = page.container.querySelector('[data-slot="marker-content"]') as HTMLElement
  const svg = icon.querySelector('svg') as SVGElement

  expect(icon.getAttribute('aria-hidden')).toBe('true')
  expect(icon.classList).toContain('marker__icon')
  expect(icon.classList).toContain('custom-marker-icon')
  expect(content.classList).toContain('marker__content')
  expect(content.classList).toContain('custom-marker-content')
  expect(getComputedStyle(svg).width).toBe('16px')
  expect(getComputedStyle(content).overflowWrap).toBe('anywhere')
})

it('内容槽为链接提供默认下划线样式', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Marker,
        {},
        {
          default: () =>
            h(
              MarkerContent,
              {},
              {
                default: () => h('a', { href: '#activity' }, '查看活动')
              }
            )
        }
      )
  })
  const page = render(Fixture)
  const link = page.container.querySelector('a') as HTMLAnchorElement

  expect(getComputedStyle(link).textDecorationLine).toContain('underline')
})

it('支持 as 与 asChild 多态渲染', () => {
  const asLink = render(Marker, {
    attrs: { href: '#details' },
    props: { as: 'a' },
    slots: { default: '查看详情' }
  })
  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        Marker,
        { asChild: true },
        {
          default: () => h('a', { href: '#next' }, '继续')
        }
      )
  })
  const asChild = render(AsChildFixture)

  expect(asLink.container.querySelector('a')?.getAttribute('href')).toBe('#details')
  expect(asChild.container.querySelector('a')?.dataset.slot).toBe('marker')
  expect(asChild.container.querySelector('a')?.classList).toContain('marker')
})

it('边界和分隔线变体使用组件局部 Token，并随主题继承颜色', () => {
  const BorderFixture = defineComponent({
    setup: () => () =>
      h(
        Marker,
        { variant: 'border' },
        {
          default: () => h(MarkerContent, {}, { default: () => '边界行' })
        }
      )
  })
  const SeparatorFixture = defineComponent({
    setup: () => () =>
      h(
        Marker,
        { variant: 'separator' },
        {
          default: () => h(MarkerContent, {}, { default: () => '今天' })
        }
      )
  })
  const borderPage = render(BorderFixture)
  const separatorPage = render(SeparatorFixture)
  const border = borderPage.container.querySelector('[data-slot="marker"]') as HTMLElement
  const separator = separatorPage.container.querySelector('[data-slot="marker"]') as HTMLElement
  const separatorContent = separatorPage.container.querySelector(
    '[data-slot="marker-content"]'
  ) as HTMLElement
  const host = borderPage.container as HTMLElement

  expect(getComputedStyle(border).borderBottomWidth).toBe('1px')
  expect(getComputedStyle(border).getPropertyValue('--marker-border').trim()).toBe(
    getComputedStyle(border).getPropertyValue('--border').trim()
  )
  expect(getComputedStyle(separator).columnGap).toBe('8px')
  expect(getComputedStyle(separator, '::before').height).toBe('1px')
  expect(getComputedStyle(separatorContent).flexGrow).toBe('0')

  host.dataset.theme = 'dark'
  expect(getComputedStyle(border).getPropertyValue('--marker-fg').trim()).toMatch(
    /^color-mix\(in oklch, oklch\(.+\) 72%, oklch\(.+\)\)$/
  )
})
