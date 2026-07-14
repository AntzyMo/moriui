import { toast } from 'vue-sonner'
import { afterEach, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { cleanup, render } from 'vitest-browser-vue'

import './sonner.style.css'
import Sonner from '../src/components/sonner/Sonner.vue'

afterEach(() => {
  cleanup()
  toast.dismiss()
  delete document.documentElement.dataset.theme
})

async function waitForToast() {
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  await nextTick()
}

it('渲染稳定槽位、合并调用方样式，并将 Nova Token 传给 Vue Sonner', () => {
  const page = render(Sonner, {
    attrs: {
      'data-testid': 'notifications'
    },
    props: {
      class: 'custom-sonner',
      style: { '--normal-bg': 'rgb(1, 2, 3)' }
    }
  })
  const toaster = page.container.querySelector('[data-sonner-toaster]') as HTMLElement

  expect(toaster.dataset.slot).toBe('sonner')
  expect(toaster.classList).toContain('sonner')
  expect(toaster.classList).toContain('custom-sonner')
  expect(toaster.dataset.testid).toBe('notifications')
  expect(toaster.style.getPropertyValue('--normal-bg')).toBe('rgb(1, 2, 3)')
  expect(toaster.style.getPropertyValue('--normal-border')).toBe('var(--border)')
})

it('渲染默认图标，并允许调用方覆盖具名图标插槽', async () => {
  const page = render(Sonner)
  toast.success('保存成功')
  await waitForToast()

  const defaultIcon = page.container.querySelector('[data-sonner-toast] [data-icon] svg')
  expect(defaultIcon).not.toBeNull()
  expect(defaultIcon?.classList).toContain('size-4')

  toast.dismiss()
  const Fixture = defineComponent({
    setup: () => () => h(Sonner, {}, {
      'success-icon': () => h('span', { 'data-testid': 'custom-success-icon' }, '✓')
    })
  })
  const customPage = render(Fixture)
  toast.success('保存成功')
  await waitForToast()

  expect(customPage.container.querySelector('[data-testid="custom-success-icon"]')?.textContent).toBe('✓')
})

it('toast 渲染描述、操作，并支持程序化关闭', async () => {
  const onAction = vi.fn()
  const page = render(Sonner)
  const id = toast('项目已创建', {
    action: {
      label: '撤销',
      onClick: event => {
        event.preventDefault()
        onAction()
      }
    },
    description: '你可以在 30 天内恢复它。'
  })
  await waitForToast()

  const item = page.container.querySelector('[data-sonner-toast]') as HTMLElement
  const action = item.querySelector('[data-action]') as HTMLButtonElement
  expect(item.querySelector('[data-description]')?.textContent).toBe('你可以在 30 天内恢复它。')
  action.click()
  expect(onAction).toHaveBeenCalledOnce()
  expect(item.dataset.removed).toBe('false')

  toast.dismiss(id)
  await waitForToast()
  expect(item.dataset.removed).toBe('true')
})

it('保留 toastOptions 自定义类，并附加稳定的 toast 类', async () => {
  const page = render(Sonner, {
    props: {
      toastOptions: {
        classes: { toast: 'custom-toast' }
      }
    }
  })
  toast.info('通知')
  await waitForToast()

  const item = page.container.querySelector('[data-sonner-toast]') as HTMLElement
  expect(item.classList).toContain('sonner__toast')
  expect(item.classList).toContain('custom-toast')
})

it('未传 theme 时跟随 HTML data-theme，显式 theme 优先', async () => {
  document.documentElement.dataset.theme = 'dark'
  const page = render(Sonner)
  await nextTick()
  const toaster = page.container.querySelector('[data-sonner-toaster]') as HTMLElement
  expect(toaster.dataset.sonnerTheme).toBe('dark')

  document.documentElement.dataset.theme = 'light'
  await Promise.resolve()
  await nextTick()
  expect(toaster.dataset.sonnerTheme).toBe('light')

  const explicitPage = render(Sonner, { props: { theme: 'dark' } })
  document.documentElement.dataset.theme = 'light'
  await Promise.resolve()
  await nextTick()
  expect((explicitPage.container.querySelector('[data-sonner-toaster]') as HTMLElement).dataset.sonnerTheme).toBe('dark')
})

it('提供 Nova 焦点样式、Alt+T 快捷键和减少动效规则', async () => {
  const page = render(Sonner, { props: { closeButton: true } })
  toast.success('保存成功')
  await waitForToast()
  const item = page.container.querySelector('[data-sonner-toast]') as HTMLElement
  const toaster = page.container.querySelector('[data-sonner-toaster]') as HTMLElement

  expect(getComputedStyle(item).borderRadius).toBe('10px')
  document.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, bubbles: true, code: 'KeyT', key: 't' }))
  await nextTick()
  expect(document.activeElement).toBe(toaster)

  const hasReducedMotionRule = Array.from(document.styleSheets).some(sheet => {
    try {
      return Array.from(sheet.cssRules).some(rule =>
        rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion')
      )
    } catch {
      return false
    }
  })
  expect(hasReducedMotionRule).toBe(true)
})
