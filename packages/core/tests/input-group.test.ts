import { expect, it } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import InputGroup from '../src/components/input-group/InputGroup.vue'
import InputGroupText from '../src/components/input-group/InputGroupText.vue'
import InputGroupAddon from '../src/components/input-group/InputGroupAddon.vue'
import InputGroupInput from '../src/components/input-group/InputGroupInput.vue'
import InputGroupButton from '../src/components/input-group/InputGroupButton.vue'

import './style.css'

it('渲染 InputGroup 的稳定槽位与原生组语义', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () => [
            h(
              InputGroupAddon,
              {},
              { default: () => h(InputGroupText, {}, { default: () => 'https://' }) }
            ),
            h(InputGroupInput, { defaultValue: 'moriui.dev' }),
            h(InputGroupButton, {}, { default: () => '清空' })
          ]
        }
      )
  })
  const page = render(Fixture)
  const group = page.container.querySelector('[data-slot="input-group"]')

  expect(group?.getAttribute('role')).toBe('group')
  expect(group?.classList).toContain('input-group')
  expect(group?.querySelector('[data-slot="input-group-addon"]')).not.toBeNull()
  expect(group?.querySelector('[data-slot="input-group-text"]')).not.toBeNull()
  expect(group?.querySelector('[data-slot="input-group-control"]')).not.toBeNull()
  expect(group?.querySelector('[data-slot="input-group-button"]')).not.toBeNull()
})

it.each([
  ['inline-start', 'input-group__addon--inline-start'],
  ['inline-end', 'input-group__addon--inline-end'],
  ['block-start', 'input-group__addon--block-start'],
  ['block-end', 'input-group__addon--block-end']
] as const)('应用 %s 附加项布局', (align, expectedClass) => {
  const page = render(InputGroupAddon, { props: { align } })
  const addon = page.container.querySelector('[data-slot="input-group-addon"]')

  expect(addon?.getAttribute('data-align')).toBe(align)
  expect(addon?.classList).toContain(expectedClass)
})

it('点击非交互附加项会聚焦同组输入框', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () => [
            h(InputGroupAddon, {}, { default: () => 'https://' }),
            h(InputGroupInput)
          ]
        }
      )
  })
  const page = render(Fixture)
  const addon = page.container.querySelector('[data-slot="input-group-addon"]') as HTMLElement
  const input = page.container.querySelector(
    '[data-slot="input-group-control"]'
  ) as HTMLInputElement

  addon.click()

  expect(document.activeElement).toBe(input)
})

it('点击附加项内的按钮不会抢夺输入框焦点', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () => [
            h(InputGroupInput),
            h(InputGroupAddon, {}, { default: () => h('button', { type: 'button' }, '操作') })
          ]
        }
      )
  })
  const page = render(Fixture)
  const input = page.container.querySelector(
    '[data-slot="input-group-control"]'
  ) as HTMLInputElement
  const button = page.container.querySelector('button') as HTMLButtonElement

  input.focus()
  button.click()

  expect(document.activeElement).toBe(input)
})

it.each([
  ['xs', 'input-group__button--xs'],
  ['sm', 'input-group__button--sm'],
  ['icon-xs', 'input-group__button--icon-xs'],
  ['icon-sm', 'input-group__button--icon-sm']
] as const)('inputGroupButton 应用 %s 尺寸并默认使用 button 类型', (size, expectedClass) => {
  const page = render(InputGroupButton, { props: { size } })
  const button = page.container.querySelector('button')

  expect(button?.getAttribute('type')).toBe('button')
  expect(button?.dataset.size).toBe(size)
  expect(button?.classList).toContain(expectedClass)
})

it('inputGroupInput 复用受控值契约并驱动组级错误状态', async () => {
  const value = ref('初始地址')
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () =>
            h(InputGroupInput, {
              'aria-invalid': 'true',
              'modelValue': value.value,
              'onUpdate:modelValue': (nextValue: string) => {
                value.value = nextValue
              }
            })
        }
      )
  })
  const page = render(Fixture)
  const group = page.container.querySelector('[data-slot="input-group"]') as HTMLElement
  const input = page.container.querySelector(
    '[data-slot="input-group-control"]'
  ) as HTMLInputElement

  input.value = '更新地址'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()

  expect(value.value).toBe('更新地址')
  expect(getComputedStyle(group).getPropertyValue('--input-group-border').trim()).toBe(
    getComputedStyle(group).getPropertyValue('--destructive').trim()
  )
})

it('聚焦组内控件时由容器提供焦点边框', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () => h(InputGroupInput)
        }
      )
  })
  const page = render(Fixture)
  const group = page.container.querySelector('[data-slot="input-group"]') as HTMLElement
  const input = page.container.querySelector(
    '[data-slot="input-group-control"]'
  ) as HTMLInputElement

  input.focus()

  expect(getComputedStyle(group).getPropertyValue('--input-group-border').trim()).toBe(
    getComputedStyle(group).getPropertyValue('--input-group-ring').trim()
  )
})

it('禁用控件使组容器进入低强调状态', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () => h(InputGroupInput, { disabled: true })
        }
      )
  })
  const page = render(Fixture)
  const group = page.container.querySelector('[data-slot="input-group"]') as HTMLElement

  expect(getComputedStyle(group).opacity).toBe('0.5')
})
