import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Collapsible from '../src/components/collapsible/Collapsible.vue'
import CollapsibleContent from '../src/components/collapsible/CollapsibleContent.vue'
import CollapsibleTrigger from '../src/components/collapsible/CollapsibleTrigger.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createFixture(rootProps: Record<string, unknown> = {}) {
  return defineComponent({
    setup: () => () => h(Collapsible, rootProps, {
      default: () => [
        h(CollapsibleTrigger, { class: 'custom-trigger' }, { default: () => '切换内容' }),
        h(CollapsibleContent, { class: 'custom-content', role: 'region' }, { default: () => '可折叠内容' })
      ]
    })
  })
}

it('渲染稳定槽位、Nova 类名并透传 Reka 属性', () => {
  const page = render(createFixture({ as: 'section', class: 'custom-root', defaultOpen: true }))
  const root = page.container.querySelector('[data-slot="collapsible"]') as HTMLElement
  const trigger = page.container.querySelector('[data-slot="collapsible-trigger"]') as HTMLButtonElement
  const content = page.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  expect(root.tagName).toBe('SECTION')
  expect(root.classList).toContain('collapsible')
  expect(root.classList).toContain('custom-root')
  expect(root.dataset.state).toBe('open')
  expect(trigger.classList).toContain('collapsible__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(trigger.getAttribute('type')).toBe('button')
  expect(content.classList).toContain('collapsible__content')
  expect(content.classList).toContain('custom-content')
  expect(content.getAttribute('role')).toBe('region')
})

it('默认关闭，点击后同步 Trigger 的 ARIA 状态与 Content 开闭状态', async () => {
  const page = render(createFixture())
  const trigger = page.container.querySelector('[data-slot="collapsible-trigger"]') as HTMLButtonElement
  const content = page.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  expect(trigger.getAttribute('aria-expanded')).toBe('false')
  expect(trigger.getAttribute('aria-controls')).toBe(content.id)
  expect(content.dataset.state).toBe('closed')

  trigger.click()
  await nextTick()
  await nextTick()

  const openedContent = page.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  expect(trigger.getAttribute('aria-expanded')).toBe('true')
  expect(openedContent.dataset.state).toBe('open')
})

it('受控 v-model:open 向父级报告并应用新的开闭值', async () => {
  const open = ref(false)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })
  const Fixture = defineComponent({
    setup: () => () => h(Collapsible, {
      'open': open.value,
      'onUpdate:open': onUpdateOpen
    }, {
      default: () => [
        h(CollapsibleTrigger, {}, { default: () => '切换内容' }),
        h(CollapsibleContent, {}, { default: () => '可折叠内容' })
      ]
    })
  })
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-slot="collapsible-trigger"]') as HTMLButtonElement

  trigger.click()
  await nextTick()

  expect(onUpdateOpen).toHaveBeenCalledWith(true)
  expect(open.value).toBe(true)
  expect(trigger.getAttribute('aria-expanded')).toBe('true')
})

it('禁用状态阻止开闭，并保留低强调的 Reka 状态属性', async () => {
  const page = render(createFixture({ disabled: true }))
  const trigger = page.container.querySelector('[data-slot="collapsible-trigger"]') as HTMLButtonElement
  const content = page.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  expect(trigger.disabled).toBe(true)
  expect(trigger.getAttribute('data-disabled')).not.toBeNull()
  expect(getComputedStyle(trigger).opacity).toBe('0.5')
  trigger.click()
  await nextTick()
  expect(trigger.getAttribute('aria-expanded')).toBe('false')
  expect(content.dataset.state).toBe('closed')
})

it('支持保留关闭内容与强制挂载内容', async () => {
  const retained = render(createFixture({ unmountOnHide: false }))
  const retainedContent = retained.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  expect(retainedContent).not.toBeNull()
  expect(retainedContent.getAttribute('hidden')).toBe('until-found')

  cleanup()
  const ForceMount = defineComponent({
    setup: () => () => h(Collapsible, {}, {
      default: () => [
        h(CollapsibleTrigger, {}, { default: () => '切换内容' }),
        h(CollapsibleContent, { forceMount: true }, { default: () => '可折叠内容' })
      ]
    })
  })
  const forced = render(ForceMount)
  const forcedContent = forced.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  expect(forcedContent).not.toBeNull()
  expect(forcedContent.dataset.state).toBe('closed')
  expect(forcedContent.textContent).toBe('可折叠内容')
})

it('消费短动效、Reka 高度变量与亮暗主题契约', async () => {
  const page = render(createFixture())
  const trigger = page.container.querySelector('[data-slot="collapsible-trigger"]') as HTMLButtonElement
  const content = page.container.querySelector('[data-slot="collapsible-content"]') as HTMLElement

  trigger.click()
  await nextTick()

  expect(getComputedStyle(content).animationName).toBe('collapsible-expand')
  expect(getComputedStyle(content).animationDuration).toBe('0.12s')
  expect(content.style.getPropertyValue('--reka-collapsible-content-height')).not.toBe('')
  expect(getComputedStyle(content).getPropertyValue('--background').trim()).toBe('oklch(1 0 0)')
  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})
