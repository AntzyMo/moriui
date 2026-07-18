import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'
import Label from '../src/components/label/Label.vue'

it('默认渲染原生标签并透传关联属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Label, {
    attrs: {
      'aria-describedby': 'project-description',
      'data-testid': 'project-label',
      onClick
    },
    props: {
      class: 'custom-label',
      for: 'project-name'
    },
    slots: {
      default: '项目名称'
    }
  })
  const label = page.container.querySelector('label') as HTMLLabelElement

  expect(label).not.toBeNull()
  expect(label.dataset.slot).toBe('label')
  expect(label.classList).toContain('label')
  expect(label.classList).toContain('custom-label')
  expect(label.htmlFor).toBe('project-name')
  expect(label.getAttribute('aria-describedby')).toBe('project-description')
  expect(label.dataset.testid).toBe('project-label')
  expect(label.textContent).toBe('项目名称')

  label.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('通过 for 关联对应控件', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h('div', [
        h(Label, { for: 'project-name' }, { default: () => '项目名称' }),
        h('input', { id: 'project-name' })
      ])
  })
  const page = render(Fixture)
  const label = page.container.querySelector('label') as HTMLLabelElement
  const input = page.container.querySelector('input') as HTMLInputElement

  label.click()

  expect(document.activeElement).toBe(input)
})

it('支持 as 与 asChild 多态渲染，并保留稳定槽位和样式', () => {
  const asSpan = render(Label, {
    attrs: { 'data-testid': 'text-label' },
    props: { as: 'span' },
    slots: { default: '说明文本' }
  })
  const span = asSpan.container.querySelector('span') as HTMLSpanElement

  expect(span.dataset.slot).toBe('label')
  expect(span.dataset.testid).toBe('text-label')
  expect(span.classList).toContain('label')

  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        Label,
        { asChild: true },
        {
          default: () => h('a', { href: '#project' }, '查看项目')
        }
      )
  })
  const asChild = render(AsChildFixture)
  const link = asChild.container.querySelector('a') as HTMLAnchorElement

  expect(link.dataset.slot).toBe('label')
  expect(link.classList).toContain('label')
  expect(link.getAttribute('href')).toBe('#project')
})

it('禁用的自身、父级或所包裹控件会使用禁用视觉状态', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h('div', [
        h(
          Label,
          { 'data-testid': 'wrapped-disabled' },
          {
            default: () => [h('input', { disabled: true }), '不可用项目']
          }
        ),
        h('div', { 'data-disabled': '' }, [
          h(Label, { 'data-testid': 'parent-disabled' }, { default: () => '父级禁用项目' })
        ]),
        h(
          Label,
          { 'data-disabled': '', 'data-testid': 'self-disabled' },
          { default: () => '自身禁用项目' }
        )
      ])
  })
  const page = render(Fixture)

  for (const selector of ['wrapped-disabled', 'parent-disabled', 'self-disabled']) {
    const label = page.container.querySelector(`[data-testid="${selector}"]`) as HTMLElement

    expect(getComputedStyle(label).opacity).toBe('0.5')
    expect(getComputedStyle(label).pointerEvents).toBe('none')
    expect(getComputedStyle(label).cursor).toBe('not-allowed')
  }
})

it('连续点击标签时阻止文本选择', () => {
  const page = render(Label, { slots: { default: '项目名称' } })
  const label = page.container.querySelector('label') as HTMLLabelElement
  const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true, detail: 2 })

  label.dispatchEvent(event)

  expect(event.defaultPrevented).toBe(true)
})
