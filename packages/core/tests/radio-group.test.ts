import RadioGroup from '../src/components/radio-group/RadioGroup.vue'
import RadioGroupItem from '../src/components/radio-group/RadioGroupItem.vue'

import { expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import './style.css'

it('渲染稳定槽位，保留调用方类名、属性和根作用域插槽参数', () => {
  const page = render(RadioGroup, {
    attrs: {
      'aria-label': '通知频率',
      'data-testid': 'frequency-group'
    },
    props: {
      class: 'custom-radio-group',
      defaultValue: 'daily'
    },
    slots: {
      default: ({ modelValue }: { modelValue: string }) => [
        h('output', { 'data-testid': 'selected-value' }, modelValue),
        h(RadioGroupItem, { class: 'custom-radio-group-item', value: 'daily' })
      ]
    }
  })
  const group = page.container.querySelector('[data-slot="radio-group"]') as HTMLElement
  const item = page.container.querySelector('[data-slot="radio-group-item"]') as HTMLButtonElement

  expect(group.getAttribute('role')).toBe('radiogroup')
  expect(group.classList).toContain('radio-group')
  expect(group.classList).toContain('custom-radio-group')
  expect(group.dataset.testid).toBe('frequency-group')
  expect(group.getAttribute('aria-label')).toBe('通知频率')
  expect(page.container.querySelector('[data-testid="selected-value"]')?.textContent).toBe('daily')
  expect(item.classList).toContain('radio-group__item')
  expect(item.classList).toContain('custom-radio-group-item')
  expect(item.getAttribute('data-state')).toBe('checked')
  expect(page.container.querySelector('[data-slot="radio-group-indicator"]')).not.toBeNull()
})

it('支持点击、受控 v-model 与完整默认作用域插槽', async () => {
  const value = ref('weekly')
  const onUpdate = vi.fn((nextValue: string) => {
    value.value = nextValue
  })
  const onSelect = vi.fn()
  const Fixture = defineComponent({
    setup: () => () => h(RadioGroup, {
      'modelValue': value.value,
      'onUpdate:modelValue': onUpdate
    }, {
      default: () => ['daily', 'weekly'].map(option => h(RadioGroupItem, {
        onSelect: option === 'daily' ? onSelect : undefined,
        value: option
      }, {
        default: ({ checked, disabled, required }: { checked: boolean, disabled: boolean, required: boolean }) => h('span', {
          'data-testid': `custom-indicator-${option}`
        }, `${checked}-${disabled}-${required}`)
      }))
    })
  })
  const page = render(Fixture)
  const radios = Array.from(page.container.querySelectorAll('[data-slot="radio-group-item"]')) as HTMLButtonElement[]

  expect(radios[1].getAttribute('aria-checked')).toBe('true')
  expect(page.container.querySelector('[data-testid="custom-indicator-weekly"]')?.textContent).toBe('true-false-false')

  radios[0].click()
  await nextTick()

  expect(value.value).toBe('daily')
  expect(onUpdate).toHaveBeenLastCalledWith('daily')
  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(radios[0].getAttribute('data-state')).toBe('checked')
  expect(page.container.querySelector('[data-testid="custom-indicator-daily"]')?.textContent).toBe('true-false-false')
})

it('支持方向键导航，跳过禁用项并保持 roving focus 语义', async () => {
  const value = ref('first')
  const Fixture = defineComponent({
    setup: () => () => h(RadioGroup, {
      'modelValue': value.value,
      'onUpdate:modelValue': (nextValue: string) => {
        value.value = nextValue
      }
    }, {
      default: () => [
        h(RadioGroupItem, { value: 'first' }),
        h(RadioGroupItem, { disabled: true, value: 'disabled' }),
        h(RadioGroupItem, { value: 'third' })
      ]
    })
  })
  const page = render(Fixture)
  const radios = Array.from(page.container.querySelectorAll('[data-slot="radio-group-item"]')) as HTMLButtonElement[]

  radios[0].focus()
  await userEvent.keyboard('{ArrowDown>}')
  await new Promise(resolve => setTimeout(resolve, 0))
  await nextTick()

  await userEvent.keyboard('{/ArrowDown}')

  expect(document.activeElement).toBe(radios[2])
  expect(value.value).toBe('third')
  expect(radios[1].getAttribute('data-state')).toBe('unchecked')
  expect(radios[2].getAttribute('data-state')).toBe('checked')
})

it('支持组级禁用、横向排列、焦点与 Nova 无效状态', async () => {
  const Fixture = defineComponent({
    setup: () => () => h('div', { 'data-theme': 'dark' }, [
      h(RadioGroup, { disabled: true, orientation: 'horizontal' }, {
        default: () => [
          h(RadioGroupItem, { value: 'one' }),
          h(RadioGroupItem, { value: 'two' })
        ]
      }),
      h(RadioGroup, { defaultValue: 'invalid' }, {
        default: () => h(RadioGroupItem, { 'aria-invalid': 'true', 'value': 'invalid' })
      })
    ])
  })
  const page = render(Fixture)
  const [disabledGroup, invalidGroup] = Array.from(page.container.querySelectorAll('[data-slot="radio-group"]')) as HTMLElement[]
  const disabledRadios = Array.from(disabledGroup.querySelectorAll('[data-slot="radio-group-item"]')) as HTMLButtonElement[]
  const invalid = invalidGroup.querySelector('[data-slot="radio-group-item"]') as HTMLButtonElement

  expect(disabledGroup.getAttribute('data-orientation')).toBe('horizontal')
  expect(getComputedStyle(disabledGroup).flexDirection).toBe('row')
  expect(disabledRadios.every(radio => radio.disabled)).toBe(true)
  expect(disabledRadios.every(radio => radio.hasAttribute('data-disabled'))).toBe(true)
  expect(getComputedStyle(invalid).getPropertyValue('--radio-group-border').trim()).toBe(
    getComputedStyle(invalid).getPropertyValue('--primary').trim()
  )

  invalid.focus()
  await nextTick()
  expect(getComputedStyle(invalid).boxShadow).not.toBe('none')
})

it('保留 RadioGroup 的表单隐藏输入、required 与选中值', async () => {
  const value = ref('email')
  const Fixture = defineComponent({
    setup: () => () => h('form', [
      h(RadioGroup, {
        'modelValue': value.value,
        'name': 'delivery',
        'required': true,
        'onUpdate:modelValue': (nextValue: string) => {
          value.value = nextValue
        }
      }, {
        default: () => [
          h(RadioGroupItem, { value: 'email' }),
          h(RadioGroupItem, { value: 'sms' })
        ]
      })
    ])
  })
  const page = render(Fixture)
  const form = page.container.querySelector('form') as HTMLFormElement
  const radios = Array.from(page.container.querySelectorAll('[data-slot="radio-group-item"]')) as HTMLButtonElement[]

  const hiddenInput = form.querySelector('input[name="delivery"]') as HTMLInputElement
  expect(hiddenInput.required).toBe(true)
  expect(new FormData(form).get('delivery')).toBe('email')

  radios[1].click()
  await nextTick()
  expect(value.value).toBe('sms')
  expect(new FormData(form).get('delivery')).toBe('sms')
})
