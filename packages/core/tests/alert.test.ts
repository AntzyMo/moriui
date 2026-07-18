import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Alert from '../src/components/alert/Alert.vue'
import AlertTitle from '../src/components/alert/AlertTitle.vue'
import { alertVariants } from '../src/components/alert/variants'
import AlertAction from '../src/components/alert/AlertAction.vue'
import AlertDescription from '../src/components/alert/AlertDescription.vue'

import './style.css'

it('默认渲染带即时提示语义的容器，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Alert, {
    attrs: {
      'aria-label': '保存结果',
      'data-testid': 'save-alert',
      onClick
    },
    props: {
      class: 'custom-alert'
    },
    slots: {
      default: '保存成功'
    }
  })
  const alert = page.container.querySelector('[data-slot="alert"]')

  expect(alert?.tagName).toBe('DIV')
  expect(alert?.getAttribute('role')).toBe('alert')
  expect(alert?.classList).toContain('alert')
  expect(alert?.classList).toContain('alert--default')
  expect(alert?.classList).toContain('custom-alert')
  expect(alert?.getAttribute('aria-label')).toBe('保存结果')
  expect(alert?.dataset.testid).toBe('save-alert')

  alert?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  expect(onClick).toHaveBeenCalledOnce()
})

it.each(['default', 'destructive'] as const)('应用 %s 变体类', variant => {
  const page = render(Alert, { props: { variant } })
  expect(page.container.querySelector('[data-slot="alert"]')?.classList).toContain(
    `alert--${variant}`
  )
})

it('alert 子组件使用 alertVariants 的 slot 类', () => {
  const slots = alertVariants()

  expect(slots.title()).toContain('alert__title')
  expect(slots.description()).toContain('alert__description')
  expect(slots.action()).toContain('alert__action')
})

it('组合标题、描述、图标与操作槽位，并应用对应布局', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Alert,
        {},
        {
          default: () => [
            h('svg', { 'viewBox': '0 0 24 24', 'aria-hidden': 'true' }),
            h(AlertTitle, {}, { default: () => '邮件已标记为垃圾邮件' }),
            h(AlertDescription, {}, { default: () => '你可以在 30 天内恢复它。' }),
            h(AlertAction, {}, { default: () => h('button', { type: 'button' }, '撤销') })
          ]
        }
      )
  })
  const page = render(Fixture)
  const alert = page.container.querySelector('[data-slot="alert"]') as HTMLElement
  const icon = alert.querySelector('svg') as SVGElement
  const title = alert.querySelector('[data-slot="alert-title"]') as HTMLElement
  const description = alert.querySelector('[data-slot="alert-description"]') as HTMLElement
  const action = alert.querySelector('[data-slot="alert-action"]') as HTMLElement

  expect(title.classList).toContain('alert__title')
  expect(description.classList).toContain('alert__description')
  expect(action.classList).toContain('alert__action')
  expect(getComputedStyle(alert).paddingRight).toBe('72px')
  expect(getComputedStyle(action).position).toBe('absolute')
  expect(getComputedStyle(icon).gridRowEnd).toBe('span 2')
})

it('允许 Alert 与描述槽位直接使用 Tailwind 类覆盖颜色', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Alert,
        { class: 'bg-blue-50 text-blue-900' },
        {
          default: () =>
            h(AlertDescription, { class: 'text-blue-700' }, { default: () => '自定义颜色' })
        }
      )
  })
  const page = render(Fixture)
  const alert = page.container.querySelector('[data-slot="alert"]') as HTMLElement
  const description = page.container.querySelector(
    '[data-slot="alert-description"]'
  ) as HTMLElement

  expect(alert.classList).toContain('bg-blue-50')
  expect(alert.classList).toContain('text-blue-900')
  expect(description.classList).toContain('text-blue-700')
})

it('默认与破坏性变体消费语义 Token，并随主题切换 Card 表面', () => {
  const defaultPage = render(Alert)
  const destructivePage = render(Alert, { props: { variant: 'destructive' } })
  const host = defaultPage.container as HTMLElement
  const defaultAlert = defaultPage.container.querySelector('[data-slot="alert"]') as HTMLElement
  const destructiveAlert = destructivePage.container.querySelector(
    '[data-slot="alert"]'
  ) as HTMLElement

  expect(getComputedStyle(defaultAlert).getPropertyValue('--alert-bg').trim()).toBe(
    getComputedStyle(defaultAlert).getPropertyValue('--card').trim()
  )
  expect(getComputedStyle(destructiveAlert).getPropertyValue('--alert-fg').trim()).toBe(
    getComputedStyle(destructiveAlert).getPropertyValue('--destructive').trim()
  )
  expect(getComputedStyle(host).getPropertyValue('--card').trim()).toBe('oklch(1 0 0)')

  host.dataset.theme = 'dark'
  expect(getComputedStyle(host).getPropertyValue('--card').trim()).toBe('oklch(0.205 0 0)')
})
