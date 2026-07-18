import { expect, it } from 'vite-plus/test'
import { userEvent } from 'vite-plus/test/browser'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import './style.css'
import Checkbox from '../src/components/checkbox/Checkbox.vue'

it('渲染稳定槽位并透传属性和调用方类名', () => {
  const page = render(Checkbox, {
    attrs: {
      'aria-label': '接受条款',
      'data-testid': 'terms-checkbox'
    },
    props: {
      class: 'custom-checkbox'
    }
  })
  const checkbox = page.container.querySelector('[data-slot="checkbox"]') as HTMLButtonElement

  expect(checkbox.tagName).toBe('BUTTON')
  expect(checkbox.classList).toContain('checkbox')
  expect(checkbox.classList).toContain('custom-checkbox')
  expect(checkbox.dataset.testid).toBe('terms-checkbox')
  expect(checkbox.getAttribute('aria-label')).toBe('接受条款')
  expect(checkbox.getAttribute('aria-checked')).toBe('false')
  expect(checkbox.getAttribute('data-state')).toBe('unchecked')
  expect(getComputedStyle(checkbox).width).toBe('16px')
  expect(getComputedStyle(checkbox).borderRadius).toBe('4px')
  expect(page.container.querySelector('[data-slot="checkbox-indicator"]')).toBeNull()
})

it('支持点击、Space 键和受控 v-model 切换', async () => {
  const value = ref(false)
  const Fixture = defineComponent({
    setup: () => () =>
      h(Checkbox, {
        'modelValue': value.value,
        'onUpdate:modelValue': (nextValue: boolean) => {
          value.value = nextValue
        }
      })
  })
  const page = render(Fixture)
  const checkbox = page.container.querySelector('[data-slot="checkbox"]') as HTMLButtonElement

  checkbox.click()
  await nextTick()
  expect(value.value).toBe(true)
  expect(checkbox.getAttribute('aria-checked')).toBe('true')
  expect(checkbox.getAttribute('data-state')).toBe('checked')
  expect(
    page.container.querySelector('[data-slot="checkbox-indicator"]')?.getAttribute('data-state')
  ).toBe('checked')

  checkbox.focus()
  await userEvent.keyboard(' ')
  await nextTick()
  expect(value.value).toBe(false)
  expect(checkbox.getAttribute('data-state')).toBe('unchecked')
})

it('半选状态保持 mixed ARIA 语义，并在切换后变为选中', async () => {
  const value = ref<boolean | 'indeterminate'>('indeterminate')
  const Fixture = defineComponent({
    setup: () => () =>
      h(Checkbox, {
        'modelValue': value.value,
        'onUpdate:modelValue': (nextValue: boolean | 'indeterminate') => {
          value.value = nextValue
        }
      })
  })
  const page = render(Fixture)
  const checkbox = page.container.querySelector('[data-slot="checkbox"]') as HTMLButtonElement
  const indicator = page.container.querySelector('[data-slot="checkbox-indicator"]') as HTMLElement

  expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
  expect(checkbox.getAttribute('data-state')).toBe('indeterminate')
  expect(indicator.getAttribute('data-state')).toBe('indeterminate')
  const indicatorMark = page.container.querySelector(
    '[data-slot="checkbox-indicator-mark"]'
  ) as HTMLElement
  expect(indicatorMark.tagName).toBe('svg')
  expect(getComputedStyle(indicatorMark).width).toBe('12px')

  checkbox.click()
  await nextTick()
  expect(value.value).toBe(true)
  expect(checkbox.getAttribute('data-state')).toBe('checked')
  expect(
    (page.container.querySelector('[data-slot="checkbox-indicator-mark"]') as HTMLElement).tagName
  ).toBe('svg')
})

it('禁用和无效状态使用 Reka 属性及对应 Nova Token', async () => {
  const value = ref(false)
  const Fixture = defineComponent({
    setup: () => () =>
      h('div', { 'data-theme': 'dark' }, [
        h(Checkbox, {
          'aria-invalid': 'true',
          'modelValue': value.value,
          'onUpdate:modelValue': (nextValue: boolean) => {
            value.value = nextValue
          }
        }),
        h(Checkbox, { 'disabled': true, 'aria-label': '不可用' })
      ])
  })
  const page = render(Fixture)
  const [invalid, disabled] = Array.from(
    page.container.querySelectorAll('[data-slot="checkbox"]')
  ) as HTMLButtonElement[]

  expect(getComputedStyle(invalid).getPropertyValue('--checkbox-border').trim()).toBe(
    `color-mix(in oklch, ${getComputedStyle(invalid).getPropertyValue('--destructive').trim()} 50%, transparent)`
  )
  expect(getComputedStyle(invalid).getPropertyValue('--checkbox-bg')).toContain(
    getComputedStyle(invalid).getPropertyValue('--input').trim()
  )
  expect(disabled.disabled).toBe(true)
  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  disabled.click()
  await nextTick()
  expect(value.value).toBe(false)

  invalid.click()
  await nextTick()
  expect(invalid.getAttribute('data-state')).toBe('checked')
  expect(getComputedStyle(invalid).getPropertyValue('--checkbox-border').trim()).toBe(
    getComputedStyle(invalid).getPropertyValue('--primary').trim()
  )
})

it('完整传递默认作用域插槽，并保留表单隐藏输入语义', async () => {
  const value = ref(false)
  const Fixture = defineComponent({
    setup: () => () =>
      h('form', [
        h(
          Checkbox,
          {
            'modelValue': value.value,
            'name': 'terms',
            'required': true,
            'value': 'accepted',
            'onUpdate:modelValue': (nextValue: boolean) => {
              value.value = nextValue
            }
          },
          {
            default: ({ modelValue, state }) =>
              h(
                'span',
                {
                  'data-testid': 'custom-indicator'
                },
                `${modelValue}-${state}`
              )
          }
        )
      ])
  })
  const page = render(Fixture)
  const form = page.container.querySelector('form') as HTMLFormElement
  const checkbox = page.container.querySelector('[data-slot="checkbox"]') as HTMLButtonElement

  checkbox.click()
  await nextTick()

  expect(page.container.querySelector('[data-testid="custom-indicator"]')?.textContent).toBe(
    'true-true'
  )
  const hiddenInput = form.querySelector('input[type="checkbox"]') as HTMLInputElement
  expect(hiddenInput.required).toBe(true)
  expect(new FormData(form).get('terms')).toBe('accepted')
})
