import { expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import InputOTP from '../src/components/input-otp/InputOTP.vue'
import InputOTPSlot from '../src/components/input-otp/InputOTPSlot.vue'
import InputOTPGroup from '../src/components/input-otp/InputOTPGroup.vue'
import InputOTPSeparator from '../src/components/input-otp/InputOTPSeparator.vue'

import './style.css'

function createSlots(length: number) {
  return () => h(InputOTPGroup, {}, {
    default: () => Array.from({ length }, (_, index) => h(InputOTPSlot, { index }))
  })
}

function inputText(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new InputEvent('input', {
    bubbles: true,
    data: value,
    inputType: 'insertText'
  }))
}

it('渲染稳定槽位、合并调用方类名并透传根属性', () => {
  const page = render(InputOTP, {
    attrs: {
      'aria-label': '六位验证码',
      'data-testid': 'verification-code'
    },
    props: {
      class: 'custom-input-otp'
    },
    slots: {
      default: () => [
        h(InputOTPGroup, { class: 'custom-group' }, {
          default: () => [h(InputOTPSlot, { class: 'custom-slot', index: 0 })]
        }),
        h(InputOTPSeparator, { class: 'custom-separator' })
      ]
    }
  })
  const root = page.container.querySelector('[data-slot="input-otp"]') as HTMLElement
  const group = page.container.querySelector('[data-slot="input-otp-group"]') as HTMLElement
  const slot = page.container.querySelector('[data-slot="input-otp-slot"]') as HTMLInputElement
  const separator = page.container.querySelector('[data-slot="input-otp-separator"]') as HTMLElement

  expect(root.classList).toContain('input-otp')
  expect(root.classList).toContain('custom-input-otp')
  expect(root.dataset.testid).toBe('verification-code')
  expect(root.getAttribute('aria-label')).toBe('六位验证码')
  expect(group.classList).toContain('input-otp__group')
  expect(group.classList).toContain('custom-group')
  expect(slot.classList).toContain('input-otp__slot')
  expect(slot.classList).toContain('custom-slot')
  expect(slot.autocomplete).toBe('one-time-code')
  expect(separator.getAttribute('role')).toBe('separator')
  expect(separator.classList).toContain('custom-separator')
  expect(separator.querySelector('[data-slot="input-otp-separator-mark"]')).not.toBeNull()
})

it('同步字符数组 v-model、自动前进并在填满后触发 complete', async () => {
  const value = ref<string[]>([])
  const complete = vi.fn()
  const Fixture = defineComponent({
    setup: () => () => h(InputOTP, {
      'modelValue': value.value,
      'onComplete': complete,
      'onUpdate:modelValue': (nextValue: string[]) => {
        value.value = nextValue
      }
    }, {
      default: createSlots(3)
    })
  })
  const page = render(Fixture)
  const inputs = Array.from(page.container.querySelectorAll('[data-slot="input-otp-slot"]')) as HTMLInputElement[]

  inputText(inputs[0], 'A')
  await nextTick()
  expect(value.value).toEqual(['A'])
  expect(document.activeElement).toBe(inputs[1])

  inputText(inputs[1], 'B')
  await nextTick()
  inputText(inputs[2], 'C')
  await nextTick()

  expect(value.value).toEqual(['A', 'B', 'C'])
  expect(complete).toHaveBeenLastCalledWith(['A', 'B', 'C'])
  expect(page.container.querySelector('[data-slot="input-otp"]')?.hasAttribute('data-complete')).toBe(true)
})

it('数字模式过滤非数字、支持粘贴分发，并保留键盘导航和删除', async () => {
  const value = ref<number[]>([])
  const Fixture = defineComponent({
    setup: () => () => h(InputOTP, {
      'modelValue': value.value,
      'onUpdate:modelValue': (nextValue: number[]) => {
        value.value = nextValue
      },
      'type': 'number'
    }, {
      default: createSlots(4)
    })
  })
  const page = render(Fixture)
  const inputs = Array.from(page.container.querySelectorAll('[data-slot="input-otp-slot"]')) as HTMLInputElement[]

  inputText(inputs[0], 'x')
  await nextTick()
  expect(value.value).toEqual([])

  const data = new DataTransfer()
  data.setData('text', '12a34')
  inputs[0].dispatchEvent(new ClipboardEvent('paste', { bubbles: true, clipboardData: data }))
  await nextTick()
  expect(value.value).toEqual([1, 2, 3, 4])

  inputs[0].focus()
  inputs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  expect(document.activeElement).toBe(inputs[1])

  inputs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Backspace' }))
  await nextTick()
  expect(value.value).toEqual([1, undefined, 3, 4])
  expect(document.activeElement).toBe(inputs[1])
})

it('允许关闭 OTP 模式，并处理无效、禁用与深色主题样式', () => {
  const Fixture = defineComponent({
    setup: () => () => h('div', { 'data-theme': 'dark' }, [
      h(InputOTP, {
        'aria-invalid': 'true',
        'otp': false
      }, {
        default: createSlots(2)
      }),
      h(InputOTP, { disabled: true }, {
        default: createSlots(2)
      })
    ])
  })
  const page = render(Fixture)
  const roots = Array.from(page.container.querySelectorAll('[data-slot="input-otp"]')) as HTMLElement[]
  const invalidSlot = roots[0].querySelector('[data-slot="input-otp-slot"]') as HTMLInputElement
  const disabledSlot = roots[1].querySelector('[data-slot="input-otp-slot"]') as HTMLInputElement

  expect(invalidSlot.getAttribute('autocomplete')).toBe('false')
  expect(getComputedStyle(invalidSlot).getPropertyValue('--input-otp-slot-border').trim()).toBe(
    getComputedStyle(invalidSlot).getPropertyValue('--destructive').trim()
  )
  expect(getComputedStyle(invalidSlot).getPropertyValue('--input-otp-slot-bg')).toContain(
    getComputedStyle(invalidSlot).getPropertyValue('--input').trim()
  )
  expect(disabledSlot.disabled).toBe(true)
  expect(disabledSlot.hasAttribute('data-disabled')).toBe(true)
  expect(roots[1].hasAttribute('data-disabled')).toBe(true)
})
