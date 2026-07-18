import { expect, it } from 'vite-plus/test'

import Button from '../src/components/button/Button.vue'
import Spinner from '../src/components/spinner/Spinner.vue'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'

it('默认渲染视觉 Spinner 并透传属性', () => {
  const page = render(Spinner, {
    attrs: {
      'aria-label': '正在加载数据',
      'data-testid': 'loading-indicator'
    }
  })
  const spinner = page.container.querySelector('span')

  expect(spinner).not.toBeNull()
  expect(spinner?.dataset.slot).toBe('spinner')
  expect(spinner?.classList).toContain('spinner')
  expect(spinner?.classList).toContain('spinner--default')
  expect(spinner?.getAttribute('aria-label')).toBe('正在加载数据')
  expect(spinner?.dataset.testid).toBe('loading-indicator')
  expect(spinner?.getAttribute('role')).toBeNull()
})

it.each([
  ['xs', 'spinner--xs'],
  ['sm', 'spinner--sm'],
  ['default', 'spinner--default'],
  ['lg', 'spinner--lg']
] as const)('应用 %s 尺寸类', (size, expectedClass) => {
  const page = render(Spinner, { props: { size } })
  expect(page.container.querySelector('span')?.classList).toContain(expectedClass)
})

it('合并调用方 class 并继承主题颜色', () => {
  const page = render(Spinner, {
    props: { class: 'custom-spinner' }
  })
  const host = page.container as HTMLElement
  const spinner = page.container.querySelector('span')

  host.dataset.theme = 'dark'
  expect(spinner?.classList).toContain('custom-spinner')
  expect(getComputedStyle(host).getPropertyValue('--foreground').trim()).toBe('oklch(0.985 0 0)')
})

it('默认尺寸继承父级 Button 的字号', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Button, { size: 'sm' }, { default: () => [h(Spinner), '保存中'] })
  })
  const page = render(Fixture)
  const button = page.container.querySelector('button')
  const spinner = page.container.querySelector('[data-slot="spinner"]')

  expect(Number.parseFloat(getComputedStyle(spinner).width)).toBeCloseTo(
    Number.parseFloat(getComputedStyle(button).fontSize),
    1
  )
})
