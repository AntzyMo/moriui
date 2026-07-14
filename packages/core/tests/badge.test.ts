import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'
import Badge from '../src/components/badge/Badge.vue'

it('默认渲染 span 并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Badge, {
    attrs: {
      'aria-label': '已发布',
      'data-testid': 'published-badge',
      onClick
    },
    props: {
      class: 'custom-badge'
    },
    slots: {
      default: '已发布'
    }
  })
  const badge = page.container.querySelector('span')

  expect(badge).not.toBeNull()
  expect(badge?.dataset.slot).toBe('badge')
  expect(badge?.classList).toContain('badge')
  expect(badge?.classList).toContain('badge--default')
  expect(badge?.classList).toContain('custom-badge')
  expect(badge?.getAttribute('aria-label')).toBe('已发布')
  expect(badge?.dataset.testid).toBe('published-badge')

  badge?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  expect(onClick).toHaveBeenCalledOnce()
})

it('允许调用方用 Tailwind 类或组件局部 Token 自定义颜色', () => {
  const defaultPage = render(Badge)
  const utilityPage = render(Badge, {
    props: {
      class: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
    }
  })
  const tokenPage = render(Badge, {
    attrs: {
      style: '--badge-bg: rgb(1, 2, 3); --badge-fg: rgb(4, 5, 6);'
    }
  })
  const defaultBadge = defaultPage.container.querySelector('[data-slot="badge"]') as HTMLElement
  const utilityBadge = utilityPage.container.querySelector('[data-slot="badge"]') as HTMLElement
  const tokenBadge = tokenPage.container.querySelector('[data-slot="badge"]') as HTMLElement

  expect(utilityBadge.classList).toContain('bg-blue-50')
  expect(utilityBadge.classList).toContain('text-blue-700')
  expect(getComputedStyle(utilityBadge).backgroundColor).not.toBe(getComputedStyle(defaultBadge).backgroundColor)
  expect(getComputedStyle(utilityBadge).color).not.toBe(getComputedStyle(defaultBadge).color)
  expect(tokenBadge.style.getPropertyValue('--badge-bg')).toBe('rgb(1, 2, 3)')
  expect(tokenBadge.style.getPropertyValue('--badge-fg')).toBe('rgb(4, 5, 6)')
  expect(getComputedStyle(tokenBadge).backgroundColor).not.toBe(getComputedStyle(defaultBadge).backgroundColor)
  expect(getComputedStyle(tokenBadge).color).not.toBe(getComputedStyle(defaultBadge).color)
})

it.each([
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link'
] as const)('应用 %s 变体类', variant => {
  const page = render(Badge, { props: { variant } })
  expect(page.container.querySelector('[data-slot="badge"]')?.classList).toContain(`badge--${variant}`)
})

it('支持 as 与 asChild 多态渲染', () => {
  const asLink = render(Badge, {
    attrs: { href: '#details' },
    props: { as: 'a' },
    slots: { default: '查看详情' }
  })
  expect(asLink.container.querySelector('a')?.getAttribute('href')).toBe('#details')

  const AsChildFixture = defineComponent({
    setup: () => () => h(Badge, { asChild: true }, { default: () => h('a', { href: '#next' }, '继续') })
  })
  const asChild = render(AsChildFixture)
  const link = asChild.container.querySelector('a')

  expect(link?.dataset.slot).toBe('badge')
  expect(link?.classList).toContain('badge')
})

it('链接形式保留默认实色 Badge，并为末尾图标收紧内边距', () => {
  const LinkFixture = defineComponent({
    setup: () => () => h(Badge, { asChild: true }, {
      default: () => h('a', { href: '#link' }, [
        'Open Link',
        h('svg', { 'data-icon': 'inline-end', 'viewBox': '0 0 24 24' })
      ])
    })
  })
  const page = render(LinkFixture)
  const badge = page.container.querySelector('a') as HTMLElement

  expect(badge.classList).toContain('badge--default')
  expect(badge.dataset.slot).toBe('badge')
  expect(badge.querySelector('[data-icon="inline-end"]')).not.toBeNull()
  expect(getComputedStyle(badge).paddingRight).toBe('6px')
})

it('聚焦可聚焦 Badge 使用浏览器焦点状态', () => {
  const page = render(Badge, { attrs: { tabindex: 0 } })
  const badge = page.container.querySelector('[data-slot="badge"]') as HTMLElement

  badge.focus()

  expect(document.activeElement).toBe(badge)
  expect(badge.matches(':focus-visible')).toBe(true)
})

it('错误状态和浅深主题使用对应 Token', () => {
  const page = render(Badge, {
    attrs: { 'aria-invalid': 'true' },
    props: { variant: 'outline' }
  })
  const host = page.container as HTMLElement
  const badge = page.container.querySelector('[data-slot="badge"]') as HTMLElement

  expect(getComputedStyle(badge).getPropertyValue('--badge-border').trim()).toBe(
    getComputedStyle(host).getPropertyValue('--destructive').trim()
  )

  host.dataset.theme = 'dark'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
  host.dataset.theme = 'light'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(1 0 0)')
})
