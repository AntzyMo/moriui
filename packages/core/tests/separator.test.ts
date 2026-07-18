import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'
import Separator from '../src/components/separator/Separator.vue'

it('默认渲染水平语义分隔线，并透传属性、事件和调用方 class', () => {
  const onClick = vi.fn()
  const page = render(Separator, {
    attrs: {
      'aria-label': '内容分隔线',
      'data-testid': 'content-separator',
      onClick
    },
    props: {
      class: 'custom-separator'
    }
  })
  const separator = page.container.querySelector('[data-slot="separator"]') as HTMLElement

  expect(separator.dataset.orientation).toBe('horizontal')
  expect(separator.getAttribute('role')).toBe('separator')
  expect(separator.getAttribute('aria-orientation')).toBeNull()
  expect(separator.classList).toContain('separator')
  expect(separator.classList).toContain('custom-separator')
  expect(separator.getAttribute('aria-label')).toBe('内容分隔线')
  expect(separator.dataset.testid).toBe('content-separator')
  expect(getComputedStyle(separator).height).toBe('1px')

  separator.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('按方向应用垂直布局与对应的无障碍语义', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h('div', { class: 'flex h-8 items-center' }, [
        h('span', '左侧内容'),
        h(Separator, { orientation: 'vertical' }),
        h('span', '右侧内容')
      ])
  })
  const page = render(Fixture)
  const separator = page.container.querySelector('[data-slot="separator"]') as HTMLElement

  expect(separator.dataset.orientation).toBe('vertical')
  expect(separator.getAttribute('aria-orientation')).toBe('vertical')
  expect(getComputedStyle(separator).width).toBe('1px')
  expect(getComputedStyle(separator).alignSelf).toBe('stretch')
})

it('装饰性分隔线由 Reka 从无障碍树中移除', () => {
  const page = render(Separator, { props: { decorative: true } })
  const separator = page.container.querySelector('[data-slot="separator"]') as HTMLElement

  expect(separator.getAttribute('role')).toBe('none')
  expect(separator.getAttribute('aria-orientation')).toBeNull()
})

it('支持 as 与 asChild 多态渲染并保留插槽内容', () => {
  const asHeader = render(Separator, {
    attrs: { 'aria-label': '章节分隔线' },
    props: { as: 'header' },
    slots: { default: '章节分隔' }
  })
  const header = asHeader.container.querySelector('header') as HTMLElement

  expect(header.dataset.slot).toBe('separator')
  expect(header.textContent).toBe('章节分隔')
  expect(header.getAttribute('aria-label')).toBe('章节分隔线')

  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        Separator,
        { asChild: true },
        {
          default: () => h('hr', { 'data-testid': 'native-separator' })
        }
      )
  })
  const asChild = render(AsChildFixture)
  const rule = asChild.container.querySelector('[data-testid="native-separator"]') as HTMLElement

  expect(rule.dataset.slot).toBe('separator')
  expect(rule.classList).toContain('separator')
  expect(rule.getAttribute('role')).toBe('separator')
})

it('在浅色与深色主题下使用与 bg-border 相同的语义颜色', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h('div', [
        h(Separator),
        h('div', {
          'data-testid': 'border-reference',
          'style': { backgroundColor: 'var(--border)' }
        })
      ])
  })
  const page = render(Fixture)
  const host = page.container as HTMLElement
  const separator = page.container.querySelector('[data-slot="separator"]') as HTMLElement
  const reference = page.container.querySelector('[data-testid="border-reference"]') as HTMLElement

  expect(getComputedStyle(separator).backgroundColor).toBe(
    getComputedStyle(reference).backgroundColor
  )

  host.dataset.theme = 'dark'
  expect(getComputedStyle(separator).backgroundColor).toBe(
    getComputedStyle(reference).backgroundColor
  )
})
