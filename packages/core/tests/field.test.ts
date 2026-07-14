import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Field from '../src/components/field/Field.vue'
import FieldSet from '../src/components/field/FieldSet.vue'
import Checkbox from '../src/components/checkbox/Checkbox.vue'
import FieldError from '../src/components/field/FieldError.vue'
import FieldGroup from '../src/components/field/FieldGroup.vue'
import FieldLabel from '../src/components/field/FieldLabel.vue'
import FieldTitle from '../src/components/field/FieldTitle.vue'
import { fieldVariants } from '../src/components/field/variants'
import FieldLegend from '../src/components/field/FieldLegend.vue'
import FieldContent from '../src/components/field/FieldContent.vue'
import FieldSeparator from '../src/components/field/FieldSeparator.vue'
import FieldDescription from '../src/components/field/FieldDescription.vue'

import './style.css'

it('渲染完整 Field 组合槽位，并保留语义、属性和调用方类名', () => {
  const onClick = vi.fn()
  const Fixture = defineComponent({
    setup: () => () => h(FieldSet, { class: 'custom-set' }, {
      default: () => [
        h(FieldLegend, { variant: 'label' }, { default: () => '联系方式' }),
        h(FieldDescription, { id: 'contact-description' }, { default: () => '用于接收项目通知。' }),
        h(FieldGroup, {}, {
          default: () => h(Field, {
            'class': 'custom-field',
            'aria-label': '邮箱地址',
            'data-testid': 'email-field',
            onClick
          }, {
            default: () => [
              h(FieldLabel, { for: 'email' }, { default: () => '邮箱地址' }),
              h('input', { id: 'email', type: 'email' }),
              h(FieldContent, {}, {
                default: () => h(FieldTitle, {}, { default: () => '工作邮箱' })
              }),
              h(FieldSeparator, {}, { default: () => '或使用其他邮箱' }),
              h(FieldError, {}, { default: () => '邮箱不可用。' })
            ]
          })
        })
      ]
    })
  })
  const page = render(Fixture)
  const field = page.container.querySelector('[data-slot="field"]') as HTMLElement

  expect(page.container.querySelector('[data-slot="field-set"]')?.tagName).toBe('FIELDSET')
  expect(page.container.querySelector('[data-slot="field-set"]')?.classList).toContain('custom-set')
  expect(page.container.querySelector('[data-slot="field-legend"]')?.tagName).toBe('LEGEND')
  expect(page.container.querySelector('[data-slot="field-legend"]')?.classList).toContain('field__legend--label')
  expect(page.container.querySelector('[data-slot="field-label"]')?.getAttribute('for')).toBe('email')
  expect(page.container.querySelector('[data-slot="field-content"]')?.classList).toContain('field__content')
  expect(page.container.querySelector('[data-slot="field-title"]')?.classList).toContain('field__title')
  expect(page.container.querySelector('[data-slot="field-separator"]')?.getAttribute('role')).toBe('separator')
  expect(page.container.querySelector('[data-slot="field-separator-content"]')?.textContent).toBe('或使用其他邮箱')
  expect(page.container.querySelector('[data-slot="field-error"]')?.getAttribute('role')).toBe('alert')
  expect(field.getAttribute('role')).toBe('group')
  expect(field.dataset.orientation).toBe('vertical')
  expect(field.classList).toContain('field')
  expect(field.classList).toContain('field--vertical')
  expect(field.classList).toContain('custom-field')
  expect(field.getAttribute('aria-label')).toBe('邮箱地址')
  expect(field.dataset.testid).toBe('email-field')

  field.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it.each(['vertical', 'horizontal', 'responsive'] as const)('应用 %s 方向变体', orientation => {
  const page = render(Field, { props: { orientation } })
  const field = page.container.querySelector('[data-slot="field"]') as HTMLElement

  expect(field.dataset.orientation).toBe(orientation)
  expect(field.classList).toContain(`field--${orientation}`)
})

it('在 FieldGroup 容器达到 28rem 时切换响应式 Field 的布局方向', () => {
  const Fixture = defineComponent({
    setup: () => () => h(FieldGroup, { style: 'width: 520px' }, {
      default: () => h(Field, { orientation: 'responsive' }, {
        default: () => [
          h(FieldContent, {}, { default: () => h(FieldTitle, {}, { default: () => '名称' }) }),
          h('input', { 'aria-label': '名称' })
        ]
      })
    })
  })
  const page = render(Fixture)
  const field = page.container.querySelector('[data-slot="field"]') as HTMLElement

  expect(getComputedStyle(field).flexDirection).toBe('row')
})

it('fieldError 优先渲染默认插槽，并过滤、去重和组织错误消息', () => {
  const slots = render(FieldError, {
    props: { errors: ['被忽略的错误'] },
    slots: { default: '自定义错误' }
  })
  expect(slots.container.querySelector('[data-slot="field-error"]')?.textContent).toBe('自定义错误')

  const single = render(FieldError, {
    props: { errors: [null, '', { message: '  邮箱地址无效  ' }, '邮箱地址无效'] }
  })
  expect(single.container.querySelector('[data-slot="field-error"]')?.textContent).toBe('邮箱地址无效')
  expect(single.container.querySelector('[data-slot="field-error-list"]')).toBeNull()

  const multiple = render(FieldError, {
    props: { errors: [{ message: '名称不能为空' }, '邮箱地址无效', '名称不能为空'] }
  })
  expect(multiple.container.querySelectorAll('[data-slot="field-error-item"]')).toHaveLength(2)

  const empty = render(FieldError, { props: { errors: [null, '', { message: ' ' }] } })
  expect(empty.container.querySelector('[data-slot="field-error"]')).toBeNull()
})

it('响应错误、禁用和 Reka 选中状态，并继承亮暗主题 Token', () => {
  const StateFixture = defineComponent({
    setup: () => () => h('div', {}, [
      h(Field, { 'data-invalid': '' }, {
        default: () => [
          h(FieldLabel, { for: 'invalid-email' }, { default: () => '邮箱地址' }),
          h('input', { 'id': 'invalid-email', 'aria-invalid': 'true' })
        ]
      }),
      h(Field, {}, {
        default: () => [
          h(FieldLabel, { for: 'disabled-name' }, { default: () => '显示名称' }),
          h('input', { id: 'disabled-name', disabled: true })
        ]
      }),
      h(FieldLabel, {}, {
        default: () => h(Field, { orientation: 'horizontal' }, {
          default: () => [
            h(Checkbox, { modelValue: true }),
            h(FieldContent, {}, { default: () => h(FieldTitle, {}, { default: () => '启用通知' }) })
          ]
        })
      })
    ])
  })
  const page = render(StateFixture)
  const host = page.container as HTMLElement
  const fields = page.container.querySelectorAll('[data-slot="field"]')
  const invalidField = fields[0] as HTMLElement
  const disabledLabel = fields[1]?.querySelector('[data-slot="field-label"]') as HTMLElement
  const choiceLabel = page.container.querySelector('label:has([data-slot="checkbox"])') as HTMLElement

  expect(getComputedStyle(invalidField).color).toBe(getComputedStyle(host).getPropertyValue('--destructive').trim())
  expect(getComputedStyle(disabledLabel).opacity).toBe(getComputedStyle(host).getPropertyValue('--disabled-opacity').trim())
  expect(page.container.querySelector('[data-slot="checkbox"]')?.getAttribute('data-state')).toBe('checked')
  expect(getComputedStyle(choiceLabel).borderColor).toBe(getComputedStyle(host).getPropertyValue('--primary').trim())

  host.dataset.theme = 'dark'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})

it('变体映射为所有可见槽位提供稳定类名', () => {
  const slots = fieldVariants({ orientation: 'horizontal', legendVariant: 'label' })

  expect(slots.base()).toContain('field--horizontal')
  expect(slots.content()).toContain('field__content')
  expect(slots.description()).toContain('field__description')
  expect(slots.error()).toContain('field__error')
  expect(slots.errorList()).toContain('field__error-list')
  expect(slots.errorItem()).toContain('field__error-item')
  expect(slots.group()).toContain('field-group')
  expect(slots.label()).toContain('field__label')
  expect(slots.legend()).toContain('field__legend--label')
  expect(slots.separator()).toContain('field__separator')
  expect(slots.separatorContent()).toContain('field__separator-content')
  expect(slots.set()).toContain('field-set')
  expect(slots.title()).toContain('field__title')
})
