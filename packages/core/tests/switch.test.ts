import { expect, it } from 'vite-plus/test'
import { userEvent } from 'vite-plus/test/browser'

import Switch from '../src/components/switch/Switch.vue'
import { switchVariants } from '../src/components/switch/variants'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import './style.css'

it('渲染稳定槽位、尺寸、属性与调用方类名', () => {
  const page = render(Switch, {
    attrs: {
      'aria-label': '启用通知',
      'data-testid': 'notification-switch'
    },
    props: {
      class: 'custom-switch'
    }
  })
  const root = page.container.querySelector('[data-slot="switch"]') as HTMLButtonElement
  const thumb = page.container.querySelector('[data-slot="switch-thumb"]') as HTMLElement

  expect(root.tagName).toBe('BUTTON')
  expect(root.classList).toContain('switch')
  expect(root.classList).toContain('switch--default')
  expect(root.classList).toContain('custom-switch')
  expect(root.dataset.size).toBe('default')
  expect(root.dataset.testid).toBe('notification-switch')
  expect(root.getAttribute('aria-label')).toBe('启用通知')
  expect(root.getAttribute('aria-checked')).toBe('false')
  expect(root.getAttribute('data-state')).toBe('unchecked')
  expect(getComputedStyle(root).width).toBe('32px')
  expect(thumb.classList).toContain('switch__thumb')
  expect(getComputedStyle(thumb).display).toBe('grid')
  expect(getComputedStyle(thumb).justifyItems).toBe('center')
  expect(getComputedStyle(thumb).width).toBe('16px')
})

it('支持点击、Space、Enter 与受控 v-model 切换', async () => {
  const value = shallowRef(false)
  const Fixture = defineComponent({
    setup: () => () =>
      h(Switch, {
        'modelValue': value.value,
        'onUpdate:modelValue': (nextValue: boolean) => {
          value.value = nextValue
        }
      })
  })
  const page = render(Fixture)
  const root = page.container.querySelector('[data-slot="switch"]') as HTMLButtonElement
  const thumb = page.container.querySelector('[data-slot="switch-thumb"]') as HTMLElement

  root.click()
  await nextTick()
  expect(value.value).toBe(true)
  expect(root.getAttribute('aria-checked')).toBe('true')
  expect(root.getAttribute('data-state')).toBe('checked')
  expect(thumb.getAttribute('data-state')).toBe('checked')
  expect(getComputedStyle(thumb).transform).not.toBe('none')

  root.focus()
  await userEvent.keyboard(' ')
  await nextTick()
  expect(value.value).toBe(false)
  expect(root.getAttribute('data-state')).toBe('unchecked')

  await userEvent.keyboard('{Enter}')
  await nextTick()
  expect(value.value).toBe(true)
  expect(root.getAttribute('data-state')).toBe('checked')
})

it('支持尺寸、暗色无效状态与禁用状态', async () => {
  const value = shallowRef(false)
  const Fixture = defineComponent({
    setup: () => () =>
      h('div', { 'data-theme': 'dark' }, [
        h(Switch, {
          'aria-invalid': 'true',
          'modelValue': value.value,
          'size': 'sm',
          'onUpdate:modelValue': (nextValue: boolean) => {
            value.value = nextValue
          }
        }),
        h(Switch, { 'disabled': true, 'aria-label': '不可用' })
      ])
  })
  const page = render(Fixture)
  const [invalid, disabled] = Array.from(
    page.container.querySelectorAll('[data-slot="switch"]')
  ) as HTMLButtonElement[]
  const invalidThumb = invalid.querySelector('[data-slot="switch-thumb"]') as HTMLElement

  expect(invalid.classList).toContain('switch--sm')
  expect(getComputedStyle(invalid).width).toBe('24px')
  expect(getComputedStyle(invalidThumb).width).toBe('12px')
  expect(getComputedStyle(invalid).getPropertyValue('--switch-border').trim()).toBe(
    `color-mix(in oklch, ${getComputedStyle(invalid).getPropertyValue('--destructive').trim()} 50%, transparent)`
  )
  expect(getComputedStyle(invalid).getPropertyValue('--switch-bg').trim()).toBe(
    `color-mix(in oklch, ${getComputedStyle(invalid).getPropertyValue('--destructive').trim()} 10%, transparent)`
  )
  expect(getComputedStyle(invalid).getPropertyValue('--switch-thumb-bg').trim()).toBe(
    getComputedStyle(invalid).getPropertyValue('--destructive').trim()
  )
  expect(disabled.disabled).toBe(true)
  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  disabled.click()
  await nextTick()
  expect(value.value).toBe(false)
})

it('完整传递 Thumb 插槽状态，并保留自定义真假值的表单语义', async () => {
  const value = shallowRef<'enabled' | 'disabled'>('disabled')
  const Fixture = defineComponent({
    setup: () => () =>
      h('form', [
        h(
          Switch,
          {
            'modelValue': value.value,
            'name': 'notifications',
            'required': true,
            'value': 'subscribed',
            'trueValue': 'enabled',
            'falseValue': 'disabled',
            'onUpdate:modelValue': (nextValue: 'enabled' | 'disabled') => {
              value.value = nextValue
            }
          },
          {
            thumb: ({
              checked,
              modelValue
            }: {
              checked: boolean
              modelValue: 'enabled' | 'disabled'
            }) =>
              h(
                'span',
                {
                  'data-testid': 'custom-thumb'
                },
                `${modelValue}-${checked}`
              )
          }
        )
      ])
  })
  const page = render(Fixture)
  const form = page.container.querySelector('form') as HTMLFormElement
  const root = page.container.querySelector('[data-slot="switch"]') as HTMLButtonElement

  root.click()
  await nextTick()

  expect(page.container.querySelector('[data-testid="custom-thumb"]')?.textContent).toBe(
    'enabled-true'
  )
  const hiddenInput = form.querySelector('input[type="checkbox"]') as HTMLInputElement
  expect(hiddenInput.required).toBe(true)
  expect(new FormData(form).get('notifications')).toBe('subscribed')
})

it('变体映射提供根节点和 Thumb 的稳定类名', () => {
  const slots = switchVariants()

  expect(slots.root()).toContain('switch')
  expect(slots.root({ size: 'sm' })).toContain('switch--sm')
  expect(slots.thumb()).toContain('switch__thumb')
})
