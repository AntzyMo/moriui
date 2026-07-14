import ToggleGroup from '../src/components/toggle-group/ToggleGroup.vue'
import { toggleGroupVariants } from '../src/components/toggle-group/variants'
import ToggleGroupItem from '../src/components/toggle-group/ToggleGroupItem.vue'

import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import './style.css'

it('渲染稳定槽位、方向以及调用方属性', () => {
  const page = render(ToggleGroup, {
    attrs: {
      'aria-label': '文本对齐',
      'data-testid': 'alignment-group'
    },
    props: {
      orientation: 'vertical',
      type: 'single'
    },
    slots: {
      default: () => h(ToggleGroupItem, { value: 'left' }, { default: () => '左对齐' })
    }
  })
  const group = page.container.querySelector('[data-slot="toggle-group"]') as HTMLElement
  const item = page.container.querySelector('[data-slot="toggle-group-item"]') as HTMLButtonElement

  expect(group.getAttribute('role')).toBe('group')
  expect(group.dataset.orientation).toBe('vertical')
  expect(group.dataset.spacing).toBe('2')
  expect(group.dataset.testid).toBe('alignment-group')
  expect(group.classList).toContain('toggle-group')
  expect(group.classList).toContain('toggle-group--vertical')
  expect(item.classList).toContain('toggle-group__item')
  expect(item.classList).toContain('toggle-group__item--default')
  expect(item.classList).toContain('toggle-group__item--default-size')
  expect(item.getAttribute('data-state')).toBe('off')
})

it('支持 single 与 multiple 受控状态，并保留 Item 的作用域插槽', async () => {
  const selected = shallowRef('center')
  const formats = shallowRef<string[]>(['bold'])
  const Fixture = defineComponent({
    setup: () => () => h('div', [
      h(ToggleGroup, {
        'modelValue': selected.value,
        'type': 'single',
        'onUpdate:modelValue': (nextValue: string) => {
          selected.value = nextValue
        }
      }, {
        default: () => [
          h(ToggleGroupItem, { value: 'left' }, { default: () => '左' }),
          h(ToggleGroupItem, { value: 'center' }, {
            default: ({ pressed }: { pressed: boolean }) => h('span', { 'data-testid': 'selected-item' }, String(pressed))
          })
        ]
      }),
      h(ToggleGroup, {
        'modelValue': formats.value,
        'type': 'multiple',
        'onUpdate:modelValue': (nextValue: string[]) => {
          formats.value = nextValue
        }
      }, {
        default: () => [
          h(ToggleGroupItem, { value: 'bold' }, { default: () => '粗体' }),
          h(ToggleGroupItem, { value: 'italic' }, { default: () => '斜体' })
        ]
      })
    ])
  })
  const page = render(Fixture)
  const groups = Array.from(page.container.querySelectorAll('[data-slot="toggle-group"]'))
  const singleItems = Array.from(groups[0].querySelectorAll('[data-slot="toggle-group-item"]')) as HTMLButtonElement[]
  const multipleItems = Array.from(groups[1].querySelectorAll('[data-slot="toggle-group-item"]')) as HTMLButtonElement[]

  expect(singleItems[1].getAttribute('data-state')).toBe('on')
  expect(page.container.querySelector('[data-testid="selected-item"]')?.textContent).toBe('true')
  singleItems[0].click()
  await nextTick()
  expect(selected.value).toBe('left')
  expect(singleItems[0].getAttribute('data-state')).toBe('on')

  expect(multipleItems[0].getAttribute('data-state')).toBe('on')
  multipleItems[1].click()
  await nextTick()
  expect(formats.value).toEqual(['bold', 'italic'])
  expect(multipleItems[1].getAttribute('data-state')).toBe('on')
})

it('支持 roving focus、禁用与 Item 变体覆盖', async () => {
  const Fixture = defineComponent({
    setup: () => () => h('div', [
      h(ToggleGroup, { type: 'single', variant: 'outline', size: 'sm' }, {
        default: () => [
          h(ToggleGroupItem, { value: 'left' }, { default: () => '左' }),
          h(ToggleGroupItem, { value: 'center', size: 'lg' }, { default: () => '中' }),
          h(ToggleGroupItem, { value: 'right' }, { default: () => '右' })
        ]
      }),
      h(ToggleGroup, { disabled: true, type: 'multiple' }, {
        default: () => h(ToggleGroupItem, { value: 'bold' }, { default: () => '粗体' })
      })
    ])
  })
  const page = render(Fixture)
  const groups = Array.from(page.container.querySelectorAll('[data-slot="toggle-group"]'))
  const items = Array.from(groups[0].querySelectorAll('[data-slot="toggle-group-item"]')) as HTMLButtonElement[]
  const disabled = groups[1].querySelector('[data-slot="toggle-group-item"]') as HTMLButtonElement

  expect(items[0].classList).toContain('toggle-group__item--outline')
  expect(items[0].classList).toContain('toggle-group__item--sm')
  expect(items[1].classList).toContain('toggle-group__item--lg')
  expect(getComputedStyle(items[1]).height).toBe('36px')

  items[0].focus()
  await userEvent.keyboard('{ArrowRight}')
  expect(document.activeElement).toBe(items[1])

  expect(disabled.disabled).toBe(true)
  expect(disabled.hasAttribute('data-disabled')).toBe(true)
})

it('仅在零间距时合并相邻项的边框和圆角，并保留 Group 表单语义', async () => {
  const Fixture = defineComponent({
    setup: () => () => h('form', [
      h(ToggleGroup, { defaultValue: ['bold'], name: 'formats', spacing: 0, type: 'multiple' }, {
        default: () => [
          h(ToggleGroupItem, { value: 'bold', variant: 'outline' }, { default: () => '粗体' }),
          h(ToggleGroupItem, { value: 'italic', variant: 'outline' }, { default: () => '斜体' })
        ]
      })
    ])
  })
  const page = render(Fixture)
  const form = page.container.querySelector('form') as HTMLFormElement
  const items = Array.from(page.container.querySelectorAll('[data-slot="toggle-group-item"]')) as HTMLButtonElement[]

  await nextTick()

  expect(getComputedStyle(items[1]).borderLeftWidth).toBe('0px')
  expect(getComputedStyle(items[1]).borderTopLeftRadius).toBe('0px')
  expect(form.querySelector('input[name="formats[0]"]')).not.toBeNull()
})

it('默认保留 Nova 间距，并允许通过 spacing 控制间隔', () => {
  const page = render(ToggleGroup, {
    props: { spacing: 3, type: 'single' },
    slots: {
      default: () => [
        h(ToggleGroupItem, { value: 'left' }, { default: () => '左' }),
        h(ToggleGroupItem, { value: 'right' }, { default: () => '右' })
      ]
    }
  })
  const group = page.container.querySelector('[data-slot="toggle-group"]') as HTMLElement
  const item = page.container.querySelector('[data-slot="toggle-group-item"]') as HTMLButtonElement

  expect(group.dataset.spacing).toBe('3')
  expect(item.dataset.spacing).toBe('3')
  expect(getComputedStyle(group).gap).toBe('12px')
  expect(getComputedStyle(item).borderRadius).not.toBe('0px')
})

it('变体映射提供根节点与 Item 的稳定类名', () => {
  const slots = toggleGroupVariants()

  expect(slots.root()).toContain('toggle-group')
  expect(slots.root({ orientation: 'vertical' })).toContain('toggle-group--vertical')
  expect(slots.item({ variant: 'outline', size: 'sm' })).toContain('toggle-group__item--outline')
  expect(slots.item({ variant: 'outline', size: 'sm' })).toContain('toggle-group__item--sm')
})
