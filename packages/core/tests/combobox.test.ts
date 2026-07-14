import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Combobox from '../src/components/combobox/Combobox.vue'
import ComboboxItem from '../src/components/combobox/ComboboxItem.vue'
import ComboboxEmpty from '../src/components/combobox/ComboboxEmpty.vue'
import ComboboxGroup from '../src/components/combobox/ComboboxGroup.vue'
import ComboboxInput from '../src/components/combobox/ComboboxInput.vue'
import ComboboxLabel from '../src/components/combobox/ComboboxLabel.vue'
import ComboboxCancel from '../src/components/combobox/ComboboxCancel.vue'
import ComboboxAnchor from '../src/components/combobox/ComboboxAnchor.vue'
import ComboboxContent from '../src/components/combobox/ComboboxContent.vue'
import ComboboxTrigger from '../src/components/combobox/ComboboxTrigger.vue'
import ComboboxViewport from '../src/components/combobox/ComboboxViewport.vue'
import ComboboxSeparator from '../src/components/combobox/ComboboxSeparator.vue'
import ComboboxItemIndicator from '../src/components/combobox/ComboboxItemIndicator.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

interface FixtureOptions {
  disabled?: boolean
  ignoreFilter?: boolean
  initialValue?: string | string[]
  invalid?: boolean
  multiple?: boolean
  resetModelValueOnClear?: boolean
}

function createFixture(options: FixtureOptions = {}) {
  const value = ref<string | string[] | undefined>(options.initialValue)
  const open = ref(false)

  const Fixture = defineComponent({
    setup: () => () => h(Combobox, {
      'disabled': options.disabled,
      'ignoreFilter': options.ignoreFilter,
      'modelValue': value.value,
      'multiple': options.multiple,
      'open': open.value,
      'resetModelValueOnClear': options.resetModelValueOnClear,
      'onUpdate:modelValue': (nextValue: string | string[] | undefined) => {
        value.value = nextValue
      },
      'onUpdate:open': (nextOpen: boolean) => {
        open.value = nextOpen
      }
    }, {
      default: slotProps => [
        h('output', { 'data-testid': 'open-state' }, String(slotProps.open)),
        h(ComboboxAnchor, { class: 'custom-anchor' }, {
          default: () => [
            h(ComboboxInput, {
              'aria-invalid': options.invalid ? 'true' : undefined,
              'placeholder': '选择框架',
              'data-testid': 'framework-input'
            }),
            h(ComboboxCancel),
            h(ComboboxTrigger, { 'aria-label': '打开框架列表' })
          ]
        }),
        h(ComboboxContent, { class: 'custom-content' }, {
          default: () => h(ComboboxViewport, {}, {
            default: () => [
              h(ComboboxEmpty),
              h(ComboboxGroup, {}, {
                default: () => [
                  h(ComboboxLabel, {}, { default: () => '框架' }),
                  h(ComboboxItem, { value: 'vue' }, {
                    default: () => ['Vue', h(ComboboxItemIndicator)]
                  }),
                  h(ComboboxItem, { value: 'react' }, {
                    default: () => ['React', h(ComboboxItemIndicator)]
                  })
                ]
              }),
              h(ComboboxSeparator),
              h(ComboboxGroup, {}, {
                default: () => h(ComboboxItem, { disabled: true, value: 'svelte' }, {
                  default: () => 'Svelte'
                })
              })
            ]
          })
        })
      ]
    })
  })

  return { Fixture, open, value }
}

async function openCombobox(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-slot="combobox-trigger"]') as HTMLButtonElement

  trigger.click()
  await nextTick()
  await nextTick()

  const content = document.body.querySelector('[data-slot="combobox-content"]') as HTMLElement
  return { content, page, trigger }
}

it('渲染稳定槽位、默认图形、调用方类名与自动 Teleport 内容', async () => {
  const { Fixture } = createFixture()
  const { content, page, trigger } = await openCombobox(Fixture)

  const root = page.container.querySelector('[data-slot="combobox"]') as HTMLElement
  const anchor = page.container.querySelector('[data-slot="combobox-anchor"]') as HTMLElement

  expect(root.classList).toContain('combobox')
  expect(anchor.classList).toContain('combobox__anchor')
  expect(anchor.classList).toContain('custom-anchor')
  expect(trigger.querySelector('[data-slot="combobox-trigger-icon"]')).not.toBeNull()
  expect(document.body.contains(content)).toBe(true)
  expect(content.classList).toContain('combobox__content')
  expect(content.classList).toContain('custom-content')
  expect(content.querySelector('[data-slot="combobox-viewport"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="combobox-label"]')?.textContent).toBe('框架')
  expect(page.container.querySelector('[data-testid="open-state"]')?.textContent).toBe('true')
  expect(content.getAttribute('data-side')).toBe('bottom')
  expect(getComputedStyle(content).minWidth).toBe('144px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).boxShadow).not.toBe('none')

  const item = content.querySelector('[data-slot="combobox-item"]') as HTMLElement
  const label = content.querySelector('[data-slot="combobox-label"]') as HTMLElement
  expect(getComputedStyle(item).paddingTop).toBe('4px')
  expect(getComputedStyle(item).paddingLeft).toBe('6px')
  expect(getComputedStyle(label).fontWeight).toBe('400')
})

it('点击输入框默认打开浮层，并允许调用方关闭该行为', async () => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const input = page.container.querySelector('[data-testid="framework-input"]') as HTMLInputElement

  input.click()
  await nextTick()
  await nextTick()
  expect(fixture.open.value).toBe(true)
  expect(document.body.querySelector('[data-slot="combobox-content"]')).not.toBeNull()

  cleanup()
  const disabledByCaller = defineComponent({
    setup: () => () => h(Combobox, { openOnClick: false }, {
      default: () => [
        h(ComboboxAnchor, {}, {
          default: () => h(ComboboxInput, { 'data-testid': 'disabled-open-input' })
        }),
        h(ComboboxContent, {}, {
          default: () => h(ComboboxViewport, {}, {
            default: () => h(ComboboxItem, { value: 'vue' }, { default: () => 'Vue' })
          })
        })
      ]
    })
  })
  const disabledPage = render(disabledByCaller)
  const disabledInput = disabledPage.container.querySelector('[data-testid="disabled-open-input"]') as HTMLInputElement

  disabledInput.click()
  await nextTick()
  expect(document.body.querySelector('[data-slot="combobox-content"]')).toBeNull()
})

it('输入时筛选项目，空态与 ignoreFilter 外部筛选模式符合 Reka 契约', async () => {
  const { Fixture } = createFixture()
  const { content, page } = await openCombobox(Fixture)
  const input = page.container.querySelector('[data-testid="framework-input"]') as HTMLInputElement

  input.value = 'Vue'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  expect(content.querySelectorAll('[data-slot="combobox-item"]')).toHaveLength(1)
  expect(content.querySelector('[data-slot="combobox-item"]')?.textContent).toContain('Vue')

  input.value = 'Angular'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  const empty = content.querySelector('[data-slot="combobox-empty"]') as HTMLElement
  expect(empty.textContent).toContain('没有匹配项')
  expect(getComputedStyle(empty).display).toBe('flex')

  cleanup()
  const manual = createFixture({ ignoreFilter: true })
  const manualPage = await openCombobox(manual.Fixture)
  const manualInput = manualPage.page.container.querySelector('[data-testid="framework-input"]') as HTMLInputElement
  manualInput.value = 'Angular'
  manualInput.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  expect(manualPage.content.querySelectorAll('[data-slot="combobox-item"]')).toHaveLength(3)
})

it('单选支持键盘导航与 Enter 选择，并在选择后关闭浮层', async () => {
  const fixture = createFixture()
  const { content, page } = await openCombobox(fixture.Fixture)
  const input = page.container.querySelector('[data-testid="framework-input"]') as HTMLInputElement

  input.focus()
  input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  expect(document.activeElement).toBe(input)
  const highlightedId = input.getAttribute('aria-activedescendant')
  const highlighted = highlightedId ? content.querySelector(`#${highlightedId}`) as HTMLElement | null : null
  expect(highlighted).not.toBeNull()
  highlighted?.setAttribute('data-highlighted', '')
  expect(getComputedStyle(highlighted as HTMLElement).backgroundColor).toBe(
    getComputedStyle(highlighted as HTMLElement).getPropertyValue('--accent').trim()
  )

  input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }))
  await nextTick()
  expect(fixture.value.value).toBe(highlighted?.textContent?.trim().toLowerCase())
  expect(fixture.open.value).toBe(false)
})

it('多选保持浮层打开并将选中值同步为数组', async () => {
  const fixture = createFixture({ multiple: true })
  const { content } = await openCombobox(fixture.Fixture)
  const items = Array.from(content.querySelectorAll('[data-slot="combobox-item"]')) as HTMLElement[]

  items[0].click()
  await nextTick()
  items[1].click()
  await nextTick()

  expect(fixture.value.value).toEqual(['vue', 'react'])
  expect(fixture.open.value).toBe(true)
  expect(content.querySelectorAll('[data-slot="combobox-item-indicator"]')).toHaveLength(2)
})

it('清空按钮重置筛选词，并在启用 resetModelValueOnClear 时清除选择值', async () => {
  const fixture = createFixture({ initialValue: 'vue', resetModelValueOnClear: true })
  const { page } = await openCombobox(fixture.Fixture)
  const input = page.container.querySelector('[data-testid="framework-input"]') as HTMLInputElement
  const cancel = page.container.querySelector('[data-slot="combobox-cancel"]') as HTMLButtonElement

  input.value = 'Vue'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  cancel.click()
  await nextTick()

  expect(input.value).toBe('')
  expect(fixture.value.value).toBeNull()
  expect(cancel.getAttribute('aria-label')).toBe('清空输入')
  expect(cancel.querySelector('[data-slot="combobox-cancel-icon"]')).not.toBeNull()
})

it('禁用、校验错误、主题和 Escape 关闭均使用既定状态样式', async () => {
  const disabled = createFixture({ disabled: true })
  const disabledPage = render(disabled.Fixture)
  const disabledTrigger = disabledPage.container.querySelector('[data-slot="combobox-trigger"]') as HTMLButtonElement

  expect(disabledTrigger.disabled).toBe(true)
  disabledTrigger.click()
  await nextTick()
  expect(document.body.querySelector('[data-slot="combobox-content"]')).toBeNull()

  cleanup()
  const invalid = createFixture({ invalid: true })
  const { content, page } = await openCombobox(invalid.Fixture)
  const anchor = page.container.querySelector('[data-slot="combobox-anchor"]') as HTMLElement

  expect(getComputedStyle(anchor).getPropertyValue('--combobox-anchor-border').trim()).toBe('oklch(0.577 0.245 27.325)')
  expect(content.classList).toContain('combobox__content')
  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--combobox-content-bg').trim()).toBe('oklch(0.205 0 0)')

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(invalid.open.value).toBe(false)
})
