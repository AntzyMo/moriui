import Toggle from '../src/components/toggle/Toggle.vue'
import { toggleVariants } from '../src/components/toggle/variants'

import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import './style.css'

it('渲染稳定槽位、变体、尺寸以及调用方属性', () => {
  const page = render(Toggle, {
    attrs: {
      'aria-label': '切换斜体',
      'data-testid': 'italic-toggle'
    },
    props: {
      class: 'custom-toggle',
      size: 'lg',
      variant: 'outline'
    },
    slots: {
      default: '斜体'
    }
  })
  const toggle = page.container.querySelector('[data-slot="toggle"]') as HTMLButtonElement

  expect(toggle.tagName).toBe('BUTTON')
  expect(toggle.classList).toContain('toggle')
  expect(toggle.classList).toContain('toggle--outline')
  expect(toggle.classList).toContain('toggle--lg')
  expect(toggle.classList).toContain('custom-toggle')
  expect(toggle.dataset.size).toBe('lg')
  expect(toggle.dataset.testid).toBe('italic-toggle')
  expect(toggle.getAttribute('aria-label')).toBe('切换斜体')
  expect(toggle.getAttribute('aria-pressed')).toBe('false')
  expect(toggle.getAttribute('data-state')).toBe('off')
  expect(getComputedStyle(toggle).height).toBe('36px')
})

it('支持点击、Space、Enter 与受控 v-model 切换', async () => {
  const value = shallowRef(false)
  const Fixture = defineComponent({
    setup: () => () => h(Toggle, {
      'modelValue': value.value,
      'onUpdate:modelValue': (nextValue: boolean) => {
        value.value = nextValue
      }
    })
  })
  const page = render(Fixture)
  const toggle = page.container.querySelector('[data-slot="toggle"]') as HTMLButtonElement

  toggle.click()
  await nextTick()
  expect(value.value).toBe(true)
  expect(toggle.getAttribute('aria-pressed')).toBe('true')
  expect(toggle.getAttribute('data-state')).toBe('on')

  toggle.focus()
  await userEvent.keyboard(' ')
  await nextTick()
  expect(value.value).toBe(false)
  expect(toggle.getAttribute('data-state')).toBe('off')

  await userEvent.keyboard('{Enter}')
  await nextTick()
  expect(value.value).toBe(true)
  expect(toggle.getAttribute('data-state')).toBe('on')
})

it('保留作用域插槽和表单隐藏输入语义', async () => {
  const value = shallowRef(false)
  const Fixture = defineComponent({
    setup: () => () => h('form', [
      h(Toggle, {
        'modelValue': value.value,
        'name': 'italic',
        'required': true,
        'value': 'enabled',
        'onUpdate:modelValue': (nextValue: boolean) => {
          value.value = nextValue
        }
      }, {
        default: ({ pressed, state }: { pressed: boolean, state: 'on' | 'off' }) => h('span', {
          'data-testid': 'toggle-content'
        }, `${pressed}-${state}`)
      })
    ])
  })
  const page = render(Fixture)
  const form = page.container.querySelector('form') as HTMLFormElement
  const toggle = page.container.querySelector('[data-slot="toggle"]') as HTMLButtonElement

  toggle.click()
  await nextTick()

  expect(page.container.querySelector('[data-testid="toggle-content"]')?.textContent).toBe('true-on')
  const hiddenInput = form.querySelector('input[type="checkbox"]') as HTMLInputElement
  expect(hiddenInput.required).toBe(true)
  expect(hiddenInput.name).toBe('italic')
  expect(hiddenInput.value).toBe('true')
})

it('无效和禁用状态使用对应的 Nova Token', async () => {
  const value = shallowRef(false)
  const Fixture = defineComponent({
    setup: () => () => h('div', { 'data-theme': 'dark' }, [
      h(Toggle, {
        'aria-invalid': 'true',
        'modelValue': value.value,
        'onUpdate:modelValue': (nextValue: boolean) => {
          value.value = nextValue
        }
      }),
      h(Toggle, { 'disabled': true, 'aria-label': '不可用' })
    ])
  })
  const page = render(Fixture)
  const [invalid, disabled] = Array.from(page.container.querySelectorAll('[data-slot="toggle"]')) as HTMLButtonElement[]

  expect(getComputedStyle(invalid).getPropertyValue('--toggle-border').trim()).toBe(
    getComputedStyle(invalid).getPropertyValue('--destructive').trim()
  )
  expect(disabled.disabled).toBe(true)
  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  disabled.click()
  await nextTick()
  expect(value.value).toBe(false)
})

it('变体映射提供稳定根节点类名', () => {
  const slots = toggleVariants()

  expect(slots.root()).toContain('toggle')
  expect(slots.root({ variant: 'outline', size: 'sm' })).toContain('toggle--outline')
  expect(slots.root({ variant: 'outline', size: 'sm' })).toContain('toggle--sm')
})
