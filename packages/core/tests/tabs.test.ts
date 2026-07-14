import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Tabs from '../src/components/tabs/Tabs.vue'
import TabsList from '../src/components/tabs/TabsList.vue'
import { tabsVariants } from '../src/components/tabs/variants'
import TabsContent from '../src/components/tabs/TabsContent.vue'
import TabsTrigger from '../src/components/tabs/TabsTrigger.vue'

import './style.css'

function tabsChildren(values: Array<{ disabled?: boolean, value: string }>, content = true) {
  return [
    h(TabsList, { 'aria-label': '账户设置' }, {
      default: () => values.map(tab => h(TabsTrigger, {
        disabled: tab.disabled,
        value: tab.value
      }, { default: () => tab.value }))
    }),
    ...(content
      ? values.map(tab => h(TabsContent, { value: tab.value }, { default: () => `${tab.value} 内容` }))
      : [])
  ]
}

it('渲染稳定槽位、Nova 默认样式、作用域插槽和 ARIA 关联', async () => {
  const page = render(Tabs, {
    attrs: {
      'aria-label': '设置页签',
      'data-testid': 'account-tabs'
    },
    props: {
      class: 'custom-tabs',
      defaultValue: 'account'
    },
    slots: {
      default: ({ modelValue }: { modelValue: string | undefined }) => [
        h('output', { 'data-testid': 'active-value' }, modelValue),
        ...tabsChildren([{ value: 'account' }, { value: 'password' }])
      ]
    }
  })
  await nextTick()

  const root = page.container.querySelector('[data-slot="tabs"]') as HTMLElement
  const list = page.container.querySelector('[data-slot="tabs-list"]') as HTMLElement
  const triggers = Array.from(page.container.querySelectorAll('[data-slot="tabs-trigger"]')) as HTMLButtonElement[]
  const content = page.container.querySelector('[data-slot="tabs-content"]') as HTMLElement

  expect(root.classList).toContain('tabs')
  expect(root.classList).toContain('custom-tabs')
  expect(root.dataset.orientation).toBe('horizontal')
  expect(root.dataset.testid).toBe('account-tabs')
  expect(root.getAttribute('aria-label')).toBe('设置页签')
  expect(page.container.querySelector('[data-testid="active-value"]')?.textContent).toBe('account')
  expect(list.classList).toContain('tabs__list')
  expect(list.classList).toContain('tabs__list--default')
  expect(list.dataset.variant).toBe('default')
  expect(getComputedStyle(list).height).toBe('32px')
  expect(triggers[0].dataset.state).toBe('active')
  expect(triggers[0].getAttribute('aria-controls')).toBe(content.id)
  expect(content.getAttribute('aria-labelledby')).toBe(triggers[0].id)
  expect(getComputedStyle(triggers[0]).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
})

it('支持受控 v-model、自动与手动激活、禁用项跳过和非循环键盘导航', async () => {
  const automaticValue = ref('first')
  const manualValue = ref('first')
  const Fixture = defineComponent({
    setup: () => () => h('div', [
      h(Tabs, {
        'modelValue': automaticValue.value,
        'onUpdate:modelValue': (value: string | number | undefined) => {
          automaticValue.value = String(value)
        }
      }, { default: () => tabsChildren([{ value: 'first' }, { value: 'second' }]) }),
      h(Tabs, {
        'activationMode': 'manual',
        'modelValue': manualValue.value,
        'onUpdate:modelValue': (value: string | number | undefined) => {
          manualValue.value = String(value)
        }
      }, {
        default: () => [
          h(TabsList, { loop: false }, {
            default: () => [
              h(TabsTrigger, { value: 'first' }, { default: () => 'first' }),
              h(TabsTrigger, { disabled: true, value: 'disabled' }, { default: () => 'disabled' }),
              h(TabsTrigger, { value: 'third' }, { default: () => 'third' })
            ]
          }),
          h(TabsContent, { value: 'first' }, { default: () => 'first 内容' }),
          h(TabsContent, { value: 'disabled' }, { default: () => 'disabled 内容' }),
          h(TabsContent, { value: 'third' }, { default: () => 'third 内容' })
        ]
      })
    ])
  })
  const page = render(Fixture)
  await nextTick()

  const groups = Array.from(page.container.querySelectorAll('[data-slot="tabs"]')) as HTMLElement[]
  const automaticTriggers = Array.from(groups[0].querySelectorAll('[data-slot="tabs-trigger"]')) as HTMLButtonElement[]
  const manualTriggers = Array.from(groups[1].querySelectorAll('[data-slot="tabs-trigger"]')) as HTMLButtonElement[]

  automaticTriggers[0].focus()
  await userEvent.keyboard('{ArrowRight}')
  await nextTick()
  expect(document.activeElement).toBe(automaticTriggers[1])
  expect(automaticValue.value).toBe('second')

  manualTriggers[0].focus()
  await userEvent.keyboard('{ArrowRight}')
  await nextTick()
  expect(document.activeElement).toBe(manualTriggers[2])
  expect(manualValue.value).toBe('first')

  await userEvent.keyboard('{Enter}')
  await nextTick()
  expect(manualValue.value).toBe('third')
  expect(manualTriggers[2].dataset.state).toBe('active')

  await userEvent.keyboard('{ArrowRight}')
  await nextTick()
  expect(document.activeElement).toBe(manualTriggers[2])
  expect(manualTriggers[1].hasAttribute('data-disabled')).toBe(true)
})

it('支持 line 与垂直布局、保留隐藏内容，并在深色主题使用对应 Token', async () => {
  const page = render(Tabs, {
    props: {
      defaultValue: 'profile',
      orientation: 'vertical',
      unmountOnHide: false
    },
    slots: {
      default: () => [
        h(TabsList, { class: 'custom-list', variant: 'line' }, {
          default: () => [
            h(TabsTrigger, { value: 'profile' }, { default: () => '资料' }),
            h(TabsTrigger, { value: 'security' }, { default: () => '安全' })
          ]
        }),
        h(TabsContent, { value: 'profile' }, { default: () => '资料内容' }),
        h(TabsContent, { value: 'security' }, { default: () => '安全内容' })
      ]
    }
  })
  await nextTick()

  const root = page.container.querySelector('[data-slot="tabs"]') as HTMLElement
  const list = page.container.querySelector('[data-slot="tabs-list"]') as HTMLElement
  const triggers = Array.from(page.container.querySelectorAll('[data-slot="tabs-trigger"]')) as HTMLButtonElement[]
  const contents = Array.from(page.container.querySelectorAll('[data-slot="tabs-content"]')) as HTMLElement[]

  expect(root.dataset.orientation).toBe('vertical')
  expect(getComputedStyle(root).flexDirection).toBe('row')
  expect(list.classList).toContain('tabs__list--line')
  expect(list.classList).toContain('custom-list')
  expect(getComputedStyle(triggers[0]).getPropertyValue('--tabs-trigger-indicator-opacity').trim()).toBe('1')
  expect(getComputedStyle(triggers[1]).getPropertyValue('--tabs-trigger-indicator-opacity').trim()).toBe('0')
  expect(contents).toHaveLength(2)
  expect(contents[1].hidden).toBe(true)

  root.dataset.theme = 'dark'
  expect(getComputedStyle(list).getPropertyValue('--tabs-trigger-active-bg').trim()).not.toBe('')
})

it('触发器支持 asChild，且变体映射为全部可见槽位生成稳定类名', async () => {
  const page = render(Tabs, {
    props: { defaultValue: 'account' },
    slots: {
      default: () => [
        h(TabsList, {}, {
          default: () => h(TabsTrigger, { asChild: true, value: 'account' }, {
            default: () => h('button', { 'class': 'custom-trigger', 'data-testid': 'as-child-trigger' }, '账户')
          })
        }),
        h(TabsContent, { value: 'account' }, { default: () => '账户内容' }),
        h(TabsContent, { forceMount: true, value: 'password' }, { default: () => '密码内容' })
      ]
    }
  })
  await nextTick()

  const trigger = page.container.querySelector('[data-testid="as-child-trigger"]') as HTMLButtonElement
  const slots = tabsVariants()

  expect(trigger.classList).toContain('tabs__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(trigger.getAttribute('role')).toBe('tab')
  expect(page.container.textContent).toContain('密码内容')
  expect(slots.root()).toContain('tabs')
  expect(slots.list()).toContain('tabs__list')
  expect(slots.trigger()).toContain('tabs__trigger')
  expect(slots.content()).toContain('tabs__content')
})
