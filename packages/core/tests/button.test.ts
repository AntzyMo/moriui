import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'
import Button from '../src/components/button/Button.vue'

it('默认渲染原生按钮并透传属性与事件', () => {
  const onClick = vi.fn()
  const page = render(Button, {
    attrs: {
      'aria-label': '保存设置',
      'data-testid': 'save-button',
      onClick,
      'type': 'submit'
    },
    slots: {
      default: '保存'
    }
  })
  const button = page.container.querySelector('button')

  expect(button).not.toBeNull()
  expect(button?.dataset.slot).toBe('button')
  expect(button?.classList).toContain('button')
  expect(button?.classList).toContain('button--default')
  expect(button?.classList).toContain('button--default-size')
  expect(button?.getAttribute('type')).toBe('submit')
  expect(button?.getAttribute('aria-label')).toBe('保存设置')
  expect(button?.dataset.testid).toBe('save-button')

  button?.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it.each(['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const)(
  '应用 %s 变体类',
  variant => {
    const page = render(Button, { props: { variant } })
    expect(page.container.querySelector('button')?.classList).toContain(`button--${variant}`)
  }
)

it.each([
  ['xs', 'button--xs'],
  ['sm', 'button--sm'],
  ['default', 'button--default-size'],
  ['lg', 'button--lg'],
  ['icon-xs', 'button--icon-xs'],
  ['icon-sm', 'button--icon-sm'],
  ['icon', 'button--icon'],
  ['icon-lg', 'button--icon-lg']
] as const)('应用 %s 尺寸类', (size, expectedClass) => {
  const page = render(Button, { props: { size } })
  expect(page.container.querySelector('button')?.classList).toContain(expectedClass)
})

it('支持 as 与 asChild 多态渲染', () => {
  const asLink = render(Button, {
    attrs: { href: '#details' },
    props: { as: 'a' },
    slots: { default: '查看详情' }
  })
  expect(asLink.container.querySelector('a')?.getAttribute('href')).toBe('#details')

  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(Button, { asChild: true }, { default: () => h('a', { href: '#next' }, '继续') })
  })
  const asChild = render(AsChildFixture)
  const link = asChild.container.querySelector('a')
  expect(link?.dataset.slot).toBe('button')
  expect(link?.classList).toContain('button')
})

it('disabled 阻止原生按钮交互并使用低强调样式', () => {
  const disabled = render(Button, { props: { disabled: true } })
  const button = disabled.container.querySelector('button')

  expect(button?.disabled).toBe(true)
  expect(getComputedStyle(button).opacity).toBe('1')
  expect(getComputedStyle(button).getPropertyValue('--button-fg').trim()).toBe('oklch(0.556 0 0)')
})

it('聚焦按钮使用浏览器焦点状态', () => {
  const page = render(Button, { slots: { default: '继续' } })
  const button = page.container.querySelector('button')
  button?.focus()

  expect(document.activeElement).toBe(button)
  expect(button?.matches(':focus-visible')).toBe(true)
})

it('light 与 dark 主题提供不同 Token', () => {
  const page = render(Button)
  const host = page.container as HTMLElement
  host.dataset.theme = 'dark'

  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
  host.dataset.theme = 'light'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(1 0 0)')
})
