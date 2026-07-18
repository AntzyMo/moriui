import { expect, it, vi } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import './style.css'
import Textarea from '../src/components/textarea/Textarea.vue'

it('渲染原生文本域并透传属性、事件和调用方类名', () => {
  const onInput = vi.fn()
  const page = render(Textarea, {
    attrs: {
      'aria-label': '项目描述',
      'data-testid': 'project-textarea',
      onInput,
      'placeholder': '输入项目描述',
      'rows': 4
    },
    props: {
      class: 'custom-textarea',
      defaultValue: 'MoriUI'
    }
  })
  const textarea = page.container.querySelector('textarea') as HTMLTextAreaElement

  expect(textarea).not.toBeNull()
  expect(textarea.dataset.slot).toBe('textarea')
  expect(textarea.classList).toContain('textarea')
  expect(textarea.classList).toContain('custom-textarea')
  expect(textarea.value).toBe('MoriUI')
  expect(textarea.getAttribute('aria-label')).toBe('项目描述')
  expect(textarea.dataset.testid).toBe('project-textarea')
  expect(textarea.placeholder).toBe('输入项目描述')
  expect(textarea.rows).toBe(4)

  textarea.value = '更新后的描述'
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
  expect(onInput).toHaveBeenCalledOnce()
})

it('支持受控字符串 v-model 与外部值更新', async () => {
  const value = ref('初始描述')
  const Fixture = defineComponent({
    setup: () => () =>
      h(Textarea, {
        'modelValue': value.value,
        'onUpdate:modelValue': (nextValue: string) => {
          value.value = nextValue
        }
      })
  })
  const page = render(Fixture)
  const textarea = page.container.querySelector('textarea') as HTMLTextAreaElement

  expect(textarea.value).toBe('初始描述')

  textarea.value = '组件更新'
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  expect(value.value).toBe('组件更新')

  value.value = '外部更新'
  await nextTick()
  expect(textarea.value).toBe('外部更新')
})

it('defaultValue 只用于非受控文本域的首次初始化', async () => {
  const defaultValue = ref('默认值')
  const Fixture = defineComponent({
    setup: () => () => h(Textarea, { defaultValue: defaultValue.value })
  })
  const page = render(Fixture)
  const textarea = page.container.querySelector('textarea') as HTMLTextAreaElement

  expect(textarea.value).toBe('默认值')

  textarea.value = '用户编辑'
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
  defaultValue.value = '后续默认值'
  await nextTick()

  expect(textarea.value).toBe('用户编辑')
})

it('modelValue 已定义时优先于 defaultValue', () => {
  const page = render(Textarea, {
    props: {
      defaultValue: '默认值',
      modelValue: '受控值'
    }
  })

  expect((page.container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('受控值')
})

it('支持错误、禁用、纵向拖拽和深色主题', () => {
  const page = render(Textarea, {
    attrs: {
      'aria-invalid': 'true',
      'disabled': true
    }
  })
  const host = page.container as HTMLElement
  const textarea = page.container.querySelector('textarea') as HTMLTextAreaElement

  host.dataset.theme = 'dark'

  expect(textarea.disabled).toBe(true)
  expect(getComputedStyle(textarea).resize).toBe('vertical')
  expect(getComputedStyle(textarea).minHeight).toBe('64px')
  expect(getComputedStyle(textarea).getPropertyValue('--textarea-border').trim()).toBe(
    getComputedStyle(host).getPropertyValue('--destructive').trim()
  )
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})

it('聚焦文本域使用浏览器焦点状态', () => {
  const page = render(Textarea)
  const textarea = page.container.querySelector('textarea') as HTMLTextAreaElement

  textarea.focus()

  expect(document.activeElement).toBe(textarea)
  expect(textarea.matches(':focus-visible')).toBe(true)
})
