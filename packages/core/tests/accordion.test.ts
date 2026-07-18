import { expect, it, vi } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Accordion from '../src/components/accordion/Accordion.vue'
import AccordionIcon from '../src/components/accordion/AccordionIcon.vue'
import AccordionItem from '../src/components/accordion/AccordionItem.vue'
import AccordionContent from '../src/components/accordion/AccordionContent.vue'
import AccordionTrigger from '../src/components/accordion/AccordionTrigger.vue'

import './style.css'

function createAccordion(
  items: Array<{ disabled?: boolean, value: string }>,
  rootProps: Record<string, unknown> = {}
) {
  return defineComponent({
    setup: () => () =>
      h(
        Accordion,
        { collapsible: true, ...rootProps },
        {
          default: () =>
            items.map(item =>
              h(
                AccordionItem,
                {
                  disabled: item.disabled,
                  value: item.value
                },
                {
                  default: () => [
                    h(
                      AccordionTrigger,
                      {},
                      { default: () => [`标题 ${item.value}`, h(AccordionIcon)] }
                    ),
                    h(AccordionContent, {}, { default: () => `内容 ${item.value}` })
                  ]
                }
              )
            )
        }
      )
  })
}

it('渲染稳定的 Accordion 槽位、转发 Reka 属性与显式默认箭头', () => {
  const page = render(createAccordion([{ value: 'one' }], { orientation: 'horizontal' }))
  const accordion = page.container.querySelector('[data-slot="accordion"]')

  expect(accordion?.classList).toContain('accordion')
  const item = accordion?.querySelector('[data-slot="accordion-item"]')
  expect(item?.getAttribute('data-orientation')).toBe('horizontal')
  expect(item?.classList).toContain('accordion__item')
  expect(accordion?.querySelector('[data-slot="accordion-header"]')).not.toBeNull()
  expect(accordion?.querySelector('[data-slot="accordion-trigger"]')?.classList).toContain(
    'accordion__trigger'
  )
  expect(accordion?.querySelector('[data-slot="accordion-icon"]')).not.toBeNull()
  const defaultChevron = accordion?.querySelector(
    '[data-slot="accordion-icon-chevron"]'
  ) as HTMLElement
  expect(defaultChevron).not.toBeNull()
  expect(defaultChevron.tagName).toBe('svg')
  expect(getComputedStyle(defaultChevron).width).toBe('16px')
  expect(getComputedStyle(defaultChevron).height).toBe('16px')
})

it('单选可折叠模式同步 aria 状态与内容开闭', async () => {
  const page = render(createAccordion([{ value: 'one' }, { value: 'two' }]))
  const triggers = Array.from(
    page.container.querySelectorAll('[data-slot="accordion-trigger"]')
  ) as HTMLButtonElement[]

  triggers[0].click()
  await nextTick()
  expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
  expect(
    page.container.querySelector('[data-slot="accordion-content"]')?.getAttribute('data-state')
  ).toBe('open')

  triggers[1].click()
  await nextTick()
  expect(triggers[0].getAttribute('aria-expanded')).toBe('false')
  expect(triggers[1].getAttribute('aria-expanded')).toBe('true')

  triggers[1].click()
  await nextTick()
  expect(triggers[1].getAttribute('aria-expanded')).toBe('false')
})

it('多选模式允许多个项目同时展开，并通过 v-model 通知父级', async () => {
  const value = ref<string[]>([])
  const onUpdate = vi.fn((nextValue: string[]) => {
    value.value = nextValue
  })
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Accordion,
        {
          'modelValue': value.value,
          'type': 'multiple',
          'onUpdate:modelValue': onUpdate
        },
        {
          default: () =>
            ['one', 'two'].map(item =>
              h(
                AccordionItem,
                { value: item },
                {
                  default: () => [
                    h(AccordionTrigger, {}, { default: () => [item, h(AccordionIcon)] }),
                    h(AccordionContent, {}, { default: () => `内容 ${item}` })
                  ]
                }
              )
            )
        }
      )
  })
  const page = render(Fixture)
  const triggers = Array.from(
    page.container.querySelectorAll('[data-slot="accordion-trigger"]')
  ) as HTMLButtonElement[]

  triggers[0].click()
  await nextTick()
  triggers[1].click()
  await nextTick()

  expect(value.value).toEqual(['one', 'two'])
  expect(onUpdate).toHaveBeenLastCalledWith(['one', 'two'])
  expect(triggers.every(trigger => trigger.getAttribute('aria-expanded') === 'true')).toBe(true)
})

it('根级与单项禁用阻止展开，并保留低强调状态', async () => {
  const disabledItem = render(createAccordion([{ disabled: true, value: 'disabled' }]))
  const disabledTrigger = disabledItem.container.querySelector(
    '[data-slot="accordion-trigger"]'
  ) as HTMLButtonElement
  const disabledContent = disabledItem.container.querySelector(
    '[data-slot="accordion-content"]'
  ) as HTMLElement

  expect(disabledTrigger.disabled).toBe(true)
  expect(disabledTrigger.getAttribute('data-disabled')).not.toBeNull()
  expect(disabledContent.hidden).toBe(true)
  expect(disabledContent.getBoundingClientRect().height).toBe(0)
  disabledTrigger.click()
  await nextTick()
  expect(disabledTrigger.getAttribute('aria-expanded')).toBe('false')

  const RootDisabled = defineComponent({
    setup: () => () =>
      h(
        Accordion,
        { disabled: true },
        {
          default: () =>
            h(
              AccordionItem,
              { value: 'one' },
              {
                default: () => h(AccordionTrigger, {}, { default: () => '标题' })
              }
            )
        }
      )
  })
  const rootDisabled = render(RootDisabled)
  expect(
    (rootDisabled.container.querySelector('[data-slot="accordion-trigger"]') as HTMLButtonElement)
      .disabled
  ).toBe(true)
})

it('禁用项目保留自身底部分隔线', () => {
  const page = render(
    createAccordion([{ value: 'one' }, { disabled: true, value: 'disabled' }, { value: 'three' }])
  )
  const items = Array.from(
    page.container.querySelectorAll('[data-slot="accordion-item"]')
  ) as HTMLElement[]

  expect(getComputedStyle(items[1]).borderBottomWidth).toBe('1px')
  expect(getComputedStyle(items[1]).borderBottomColor).toBe(
    getComputedStyle(items[1]).getPropertyValue('--border').trim()
  )
})

it('使用方向键、Home 与 End 在触发器之间移动焦点', () => {
  const page = render(createAccordion([{ value: 'one' }, { value: 'two' }, { value: 'three' }]))
  const triggers = Array.from(
    page.container.querySelectorAll('[data-slot="accordion-trigger"]')
  ) as HTMLButtonElement[]

  triggers[0].focus()
  triggers[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  expect(document.activeElement).toBe(triggers[1])

  triggers[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'End' }))
  expect(document.activeElement).toBe(triggers[2])

  triggers[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Home' }))
  expect(document.activeElement).toBe(triggers[0])
})

it('支持自定义 AccordionIcon，并在主题和减少动效设置下消费样式契约', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Accordion,
        {},
        {
          default: () =>
            h(
              AccordionItem,
              { value: 'one' },
              {
                default: () => [
                  h(
                    AccordionTrigger,
                    {},
                    {
                      default: () => [
                        '标题',
                        h(
                          AccordionIcon,
                          {},
                          { default: () => h('span', { 'data-testid': 'custom-icon' }, '+') }
                        )
                      ]
                    }
                  ),
                  h(AccordionContent, {}, { default: () => '内容' })
                ]
              }
            )
        }
      )
  })
  const page = render(Fixture)
  const accordion = page.container.querySelector('[data-slot="accordion"]') as HTMLElement

  const customIcon = accordion.querySelector('[data-testid="custom-icon"]') as HTMLElement
  expect(customIcon).not.toBeNull()
  expect(accordion.querySelector('[data-slot="accordion-icon"]')).not.toBeNull()
  expect(getComputedStyle(customIcon).width).toBe('16px')
  expect(getComputedStyle(customIcon).height).toBe('16px')
  const trigger = accordion.querySelector('[data-slot="accordion-trigger"]') as HTMLElement
  expect(getComputedStyle(trigger).paddingTop).toBe('10px')

  accordion.dataset.theme = 'dark'
  expect(getComputedStyle(accordion).getPropertyValue('--background').trim()).toBe(
    'oklch(0.145 0 0)'
  )
  expect(getComputedStyle(trigger).transitionDuration).toBe('0.15s')
})
