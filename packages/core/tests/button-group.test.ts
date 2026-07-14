import { expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Button from '../src/components/button/Button.vue'
import ButtonGroup from '../src/components/button-group/ButtonGroup.vue'
import ButtonGroupText from '../src/components/button-group/ButtonGroupText.vue'
import ButtonGroupSeparator from '../src/components/button-group/ButtonGroupSeparator.vue'

import './style.css'

it('默认渲染分组语义并透传属性', () => {
  const page = render(ButtonGroup, {
    attrs: {
      'aria-label': '文档操作',
      'data-testid': 'document-actions'
    },
    slots: {
      default: '操作'
    }
  })
  const group = page.container.querySelector('[data-slot="button-group"]')

  expect(group?.tagName).toBe('DIV')
  expect(group?.getAttribute('role')).toBe('group')
  expect(group?.getAttribute('aria-label')).toBe('文档操作')
  expect(group?.dataset.orientation).toBe('horizontal')
  expect(group?.dataset.testid).toBe('document-actions')
  expect(group?.classList).toContain('button-group')
  expect(group?.classList).toContain('button-group--horizontal')
})

it('支持纵向布局与多态渲染', () => {
  const vertical = render(ButtonGroup, { props: { orientation: 'vertical' } })
  const group = vertical.container.querySelector('[data-slot="button-group"]')

  expect(group?.dataset.orientation).toBe('vertical')
  expect(group?.classList).toContain('button-group--vertical')

  const asLink = render(ButtonGroup, {
    attrs: { href: '#actions' },
    props: { as: 'a' }
  })
  expect(asLink.container.querySelector('a')?.getAttribute('href')).toBe('#actions')

  const AsChildFixture = defineComponent({
    setup: () => () => h(ButtonGroup, { asChild: true }, { default: () => h('section', { id: 'actions' }) })
  })
  const asChild = render(AsChildFixture)
  expect(asChild.container.querySelector('section')?.dataset.slot).toBe('button-group')
})

it('渲染静态文字槽位并合并调用方 class', () => {
  const page = render(ButtonGroupText, {
    props: { class: 'custom-text' },
    slots: { default: '视图' }
  })
  const text = page.container.querySelector('[data-slot="button-group-text"]')

  expect(text?.textContent).toBe('视图')
  expect(text?.classList).toContain('button-group__text')
  expect(text?.classList).toContain('custom-text')
})

it('分隔线按分组方向推导，并允许显式覆盖', () => {
  const HorizontalFixture = defineComponent({
    setup: () => () => h(ButtonGroup, {}, { default: () => h(ButtonGroupSeparator) })
  })
  const horizontal = render(HorizontalFixture)
  expect(horizontal.container.querySelector('[data-slot="button-group-separator"]')?.dataset.orientation).toBe('vertical')

  const VerticalFixture = defineComponent({
    setup: () => () => h(ButtonGroup, { orientation: 'vertical' }, { default: () => h(ButtonGroupSeparator) })
  })
  const vertical = render(VerticalFixture)
  expect(vertical.container.querySelector('[data-slot="button-group-separator"]')?.dataset.orientation).toBe('horizontal')

  const explicit = render(ButtonGroupSeparator, { props: { orientation: 'horizontal' } })
  expect(explicit.container.querySelector('[data-slot="button-group-separator"]')?.dataset.orientation).toBe('horizontal')
})

it('合并相邻控件的边框和圆角，并提高焦点元素层级', () => {
  const Fixture = defineComponent({
    setup: () => () => h(ButtonGroup, {}, {
      default: () => [
        h(Button, { variant: 'outline' }, { default: () => '保存' }),
        h(Button, { variant: 'outline' }, { default: () => '预览' })
      ]
    })
  })
  const page = render(Fixture)
  const buttons = page.container.querySelectorAll('button')
  const secondButton = buttons[1] as HTMLButtonElement

  expect(getComputedStyle(secondButton).borderLeftWidth).toBe('0px')
  expect(getComputedStyle(secondButton).borderTopLeftRadius).toBe('0px')

  secondButton.focus()
  expect(secondButton.matches(':focus-visible')).toBe(true)
  expect(getComputedStyle(secondButton).zIndex).toBe('10')
})

it('亮暗主题下继续使用全局 Token', () => {
  const page = render(ButtonGroupText)
  const host = page.container as HTMLElement

  host.dataset.theme = 'dark'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
  host.dataset.theme = 'light'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(1 0 0)')
})
