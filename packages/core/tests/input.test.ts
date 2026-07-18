import { expect, it, vi } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import './style.css'
import Input from '../src/components/input/Input.vue'

it('渲染原生输入框并透传属性、事件和调用方类名', () => {
  const onInput = vi.fn()
  const page = render(Input, {
    attrs: {
      'aria-label': '项目名称',
      'data-testid': 'project-input',
      onInput,
      'placeholder': '输入项目名称',
      'type': 'text'
    },
    props: {
      class: 'custom-input',
      defaultValue: 'MoriUI'
    }
  })
  const input = page.container.querySelector('input') as HTMLInputElement

  expect(input).not.toBeNull()
  expect(input.dataset.slot).toBe('input')
  expect(input.classList).toContain('input')
  expect(input.classList).toContain('custom-input')
  expect(input.value).toBe('MoriUI')
  expect(input.getAttribute('aria-label')).toBe('项目名称')
  expect(input.dataset.testid).toBe('project-input')
  expect(input.placeholder).toBe('输入项目名称')

  input.value = '更新后的名称'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  expect(onInput).toHaveBeenCalledOnce()
})

it('支持受控字符串 v-model 与外部值更新', async () => {
  const value = ref('初始值')
  const Fixture = defineComponent({
    setup: () => () =>
      h(Input, {
        'modelValue': value.value,
        'onUpdate:modelValue': (nextValue: string) => {
          value.value = nextValue
        }
      })
  })
  const page = render(Fixture)
  const input = page.container.querySelector('input') as HTMLInputElement

  expect(input.value).toBe('初始值')

  input.value = '组件更新'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  expect(value.value).toBe('组件更新')

  value.value = '外部更新'
  await nextTick()
  expect(input.value).toBe('外部更新')
})

it('defaultValue 只用于非受控输入的首次初始化', async () => {
  const defaultValue = ref('默认值')
  const Fixture = defineComponent({
    setup: () => () => h(Input, { defaultValue: defaultValue.value })
  })
  const page = render(Fixture)
  const input = page.container.querySelector('input') as HTMLInputElement

  expect(input.value).toBe('默认值')

  input.value = '用户编辑'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  defaultValue.value = '后续默认值'
  await nextTick()

  expect(input.value).toBe('用户编辑')
})

it('modelValue 已定义时优先于 defaultValue', () => {
  const page = render(Input, {
    props: {
      defaultValue: '默认值',
      modelValue: '受控值'
    }
  })

  expect((page.container.querySelector('input') as HTMLInputElement).value).toBe('受控值')
})

it('支持焦点、错误、禁用、文件类型和深色主题', () => {
  const page = render(Input, {
    attrs: {
      'aria-invalid': 'true',
      'disabled': true,
      'type': 'file'
    }
  })
  const host = page.container as HTMLElement
  const input = page.container.querySelector('input') as HTMLInputElement

  host.dataset.theme = 'dark'

  expect(input.type).toBe('file')
  expect(input.disabled).toBe(true)
  expect(getComputedStyle(input).getPropertyValue('--input-border').trim()).toBe(
    getComputedStyle(host).getPropertyValue('--destructive').trim()
  )
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})

it('聚焦输入框使用浏览器焦点状态', () => {
  const page = render(Input)
  const input = page.container.querySelector('input') as HTMLInputElement

  input.focus()

  expect(document.activeElement).toBe(input)
  expect(input.matches(':focus-visible')).toBe(true)
})
