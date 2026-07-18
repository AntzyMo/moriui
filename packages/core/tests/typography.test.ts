import { expect, it, vi } from 'vite-plus/test'

import Typography from '../src/components/typography/Typography.vue'
import { typographyVariants } from '../src/components/typography/variants'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'

it('默认渲染语义化正文，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Typography, {
    attrs: {
      'aria-label': '组件说明',
      'data-testid': 'typography-body',
      onClick
    },
    props: { class: 'custom-typography' },
    slots: { default: '这是一段正文。' }
  })
  const typography = page.container.querySelector('[data-slot="typography"]') as HTMLElement

  expect(typography.tagName).toBe('P')
  expect(typography.dataset.type).toBe('body')
  expect(typography.classList).toContain('typography')
  expect(typography.classList).toContain('typography--body')
  expect(typography.classList).toContain('custom-typography')
  expect(typography.getAttribute('aria-label')).toBe('组件说明')
  expect(typography.dataset.testid).toBe('typography-body')

  typography.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it.each([
  ['body', 'P'],
  ['body-sm', 'P'],
  ['body-xs', 'P'],
  ['code', 'CODE'],
  ['h1', 'H1'],
  ['h2', 'H2'],
  ['h3', 'H3'],
  ['h4', 'H4'],
  ['h5', 'H5'],
  ['h6', 'H6']
] as const)('将 %s 映射为默认语义元素与稳定类名', (type, tagName) => {
  const page = render(Typography, { props: { type } })
  const typography = page.container.querySelector('[data-slot="typography"]') as HTMLElement

  expect(typography.tagName).toBe(tagName)
  expect(typography.dataset.type).toBe(type)
  expect(typography.classList).toContain(`typography--${type}`)
})

it('变体映射为全部公开 props 提供稳定类名', () => {
  const slots = typographyVariants({
    type: 'h2',
    align: 'center',
    color: 'muted',
    weight: 'bold',
    truncate: true
  })

  expect(slots.base()).toContain('typography')
  expect(slots.base()).toContain('typography--h2')
  expect(slots.base()).toContain('typography--align-center')
  expect(slots.base()).toContain('typography--color-muted')
  expect(slots.base()).toContain('typography--weight-bold')
  expect(slots.base()).toContain('typography--truncate')
})

it('支持 as 与 asChild 多态渲染', () => {
  const asLink = render(Typography, {
    attrs: { href: '#details' },
    props: { as: 'a', type: 'h2' },
    slots: { default: '查看详情' }
  })
  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        Typography,
        { asChild: true },
        {
          default: () => h('a', { href: '#next' }, '继续阅读')
        }
      )
  })
  const asChild = render(AsChildFixture)

  expect(asLink.container.querySelector('a')?.getAttribute('href')).toBe('#details')
  expect(asLink.container.querySelector('a')?.dataset.type).toBe('h2')
  expect(asChild.container.querySelector('a')?.dataset.slot).toBe('typography')
  expect(asChild.container.querySelector('a')?.classList).toContain('typography')
})

it('应用对齐、颜色、字重与截断样式，并支持局部 Token 覆盖', () => {
  const page = render(Typography, {
    attrs: {
      style: '--typography-fg: rgb(1, 2, 3);'
    },
    props: {
      align: 'end',
      color: 'muted',
      weight: 'medium',
      truncate: true
    },
    slots: { default: '不会换行的长文本' }
  })
  const typography = page.container.querySelector('[data-slot="typography"]') as HTMLElement

  expect(typography.classList).toContain('typography--align-end')
  expect(typography.classList).toContain('typography--color-muted')
  expect(typography.classList).toContain('typography--weight-medium')
  expect(typography.classList).toContain('typography--truncate')
  expect(getComputedStyle(typography).textAlign).toBe('end')
  expect(getComputedStyle(typography).fontWeight).toBe('500')
  expect(getComputedStyle(typography).whiteSpace).toBe('nowrap')
  expect(getComputedStyle(typography).overflow).toBe('hidden')
  expect(getComputedStyle(typography).color).toBe('rgb(1, 2, 3)')
})

it('标题、正文和代码使用 Nova Token，并随主题切换', () => {
  const headingPage = render(Typography, { props: { type: 'h1' } })
  const bodyPage = render(Typography, { props: { type: 'body-sm' } })
  const codePage = render(Typography, { props: { type: 'code' } })
  const heading = headingPage.container.querySelector('[data-slot="typography"]') as HTMLElement
  const body = bodyPage.container.querySelector('[data-slot="typography"]') as HTMLElement
  const code = codePage.container.querySelector('[data-slot="typography"]') as HTMLElement
  const host = headingPage.container as HTMLElement

  expect(getComputedStyle(heading).fontSize).toBe('36px')
  expect(getComputedStyle(body).fontSize).toBe('14px')
  expect(getComputedStyle(body).lineHeight).toBe('24px')
  expect(getComputedStyle(code).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
  expect(getComputedStyle(heading).getPropertyValue('--typography-fg').trim()).toBe(
    getComputedStyle(heading).getPropertyValue('--foreground').trim()
  )

  host.dataset.theme = 'dark'
  expect(getComputedStyle(heading).getPropertyValue('--typography-fg').trim()).toBe(
    getComputedStyle(heading).getPropertyValue('--foreground').trim()
  )
})
