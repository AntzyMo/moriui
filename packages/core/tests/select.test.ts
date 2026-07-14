import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Select from '../src/components/select/Select.vue'
import SelectItem from '../src/components/select/SelectItem.vue'
import SelectGroup from '../src/components/select/SelectGroup.vue'
import SelectLabel from '../src/components/select/SelectLabel.vue'
import SelectValue from '../src/components/select/SelectValue.vue'
import SelectContent from '../src/components/select/SelectContent.vue'
import SelectTrigger from '../src/components/select/SelectTrigger.vue'
import SelectItemText from '../src/components/select/SelectItemText.vue'
import SelectViewport from '../src/components/select/SelectViewport.vue'
import SelectSeparator from '../src/components/select/SelectSeparator.vue'
import SelectItemIndicator from '../src/components/select/SelectItemIndicator.vue'
import SelectScrollUpButton from '../src/components/select/SelectScrollUpButton.vue'
import SelectScrollDownButton from '../src/components/select/SelectScrollDownButton.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

interface FixtureOptions {
  disabled?: boolean
  initialValue?: string | string[]
  invalid?: boolean
  multiple?: boolean
  position?: 'item-aligned' | 'popper'
}

function selectItem(value: string, label: string, disabled = false) {
  return h(SelectItem, { disabled, value }, {
    default: () => [
      h(SelectItemIndicator),
      h(SelectItemText, {}, { default: () => label })
    ]
  })
}

function createFixture(options: FixtureOptions = {}) {
  const value = ref<string | string[] | undefined>(options.initialValue)
  const open = ref(false)

  const Fixture = defineComponent({
    setup: () => () => h('form', { 'data-testid': 'form' }, [
      h(Select, {
        'disabled': options.disabled,
        'modelValue': value.value,
        'multiple': options.multiple,
        'name': 'framework',
        'open': open.value,
        'required': true,
        'onUpdate:modelValue': (nextValue: string | string[] | undefined) => {
          value.value = nextValue
        },
        'onUpdate:open': (nextOpen: boolean) => {
          open.value = nextOpen
        }
      }, {
        default: () => [
          h(SelectTrigger, {
            'aria-invalid': options.invalid ? 'true' : undefined,
            'aria-label': '选择框架',
            'class': 'custom-trigger',
            'data-testid': 'framework-trigger'
          }, {
            default: () => h(SelectValue, { placeholder: '选择框架' })
          }),
          h(SelectContent, { class: 'custom-content', position: options.position }, {
            default: () => [
              h(SelectScrollUpButton),
              h(SelectViewport, {}, {
                default: () => [
                  h(SelectGroup, {}, {
                    default: () => [
                      h(SelectLabel, {}, { default: () => '前端框架' }),
                      selectItem('vue', 'Vue'),
                      selectItem('react', 'React')
                    ]
                  }),
                  h(SelectSeparator),
                  h(SelectGroup, {}, {
                    default: () => selectItem('svelte', 'Svelte', true)
                  })
                ]
              }),
              h(SelectScrollDownButton)
            ]
          })
        ]
      })
    ])
  })

  return { Fixture, open, value }
}

async function openSelect(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="framework-trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true,
    button: 0,
    pointerType: 'mouse'
  }))
  await nextTick()
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 50))

  const content = document.body.querySelector('[data-slot="select-content"]') as HTMLElement
  return { content, page, trigger }
}

async function selectByPointer(item: HTMLElement) {
  item.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true,
    button: 0,
    clientX: 12,
    clientY: 12,
    pointerType: 'mouse'
  }))
  document.dispatchEvent(new PointerEvent('pointermove', {
    bubbles: true,
    clientX: 24,
    clientY: 24,
    pointerType: 'mouse'
  }))
  item.dispatchEvent(new PointerEvent('pointerup', {
    bubbles: true,
    button: 0,
    clientX: 24,
    clientY: 24,
    pointerType: 'mouse'
  }))
  await nextTick()
  await nextTick()
}

it('渲染完整组合槽位、默认图标、调用方类名与 Teleport 内容', async () => {
  const { Fixture } = createFixture()
  const { content, page, trigger } = await openSelect(Fixture)

  const root = page.container.querySelector('[data-slot="select"]') as HTMLElement
  const viewport = content.querySelector('[data-slot="select-viewport"]') as HTMLElement

  expect(root.classList).toContain('select')
  expect(trigger.classList).toContain('select__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(trigger.querySelector('[data-slot="select-trigger-icon"]')).not.toBeNull()
  expect(document.body.contains(content)).toBe(true)
  expect(content.classList).toContain('select__content')
  expect(content.classList).toContain('custom-content')
  expect(viewport).not.toBeNull()
  expect(content.querySelector('[data-slot="select-label"]')?.textContent).toBe('前端框架')
  expect(content.querySelector('[data-slot="select-separator"]')).not.toBeNull()
  expect(content.getAttribute('data-side')).toBe('bottom')
  expect(getComputedStyle(trigger).height).toBe('32px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).boxShadow).not.toBe('none')
})

it('单选支持鼠标选择、状态同步与原生表单控件', async () => {
  const fixture = createFixture()
  const { content, page } = await openSelect(fixture.Fixture)
  const vueItem = content.querySelector('[data-slot="select-item"]') as HTMLElement

  await selectByPointer(vueItem)

  expect(fixture.value.value).toBe('vue')
  expect(fixture.open.value).toBe(false)
  expect(page.container.querySelector('[data-slot="select-value"]')?.textContent).toContain('Vue')

  const nativeSelect = page.container.querySelector('select[name="framework"]') as HTMLSelectElement
  expect(nativeSelect).not.toBeNull()
  expect(nativeSelect.required).toBe(true)
  expect(nativeSelect.value).toBe('vue')
})

it('键盘导航跳过禁用项，并使用 Enter 选择、Escape 关闭', async () => {
  const fixture = createFixture()
  const { content } = await openSelect(fixture.Fixture)

  const selectedItem = document.activeElement as HTMLElement
  selectedItem.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve))
  expect((document.activeElement as HTMLElement).textContent).toContain('React')

  ;(document.activeElement as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }))
  await nextTick()
  await nextTick()
  await new Promise(resolve => setTimeout(resolve))
  expect(fixture.value.value).toBe('react')
  expect(fixture.open.value).toBe(false)

  ;(document.activeElement as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(fixture.open.value).toBe(false)
  expect(content.querySelectorAll('[data-slot="select-item"]')).toHaveLength(3)
})

it('多选保留浮层并将已选项同步为数组', async () => {
  const fixture = createFixture({ initialValue: ['vue'], multiple: true, position: 'popper' })
  const { content } = await openSelect(fixture.Fixture)
  const items = Array.from(content.querySelectorAll('[data-slot="select-item"]')) as HTMLElement[]

  await selectByPointer(items[1])

  expect(fixture.value.value).toEqual(['vue', 'react'])
  expect(fixture.open.value).toBe(true)
  expect(content.querySelectorAll('[data-slot="select-item-indicator"]')).toHaveLength(2)
  expect(content.getAttribute('data-side')).toBe('bottom')
})

it('禁用、校验错误、主题及 typeahead 使用既定状态样式', async () => {
  const disabled = createFixture({ disabled: true })
  const disabledPage = render(disabled.Fixture)
  const disabledTrigger = disabledPage.container.querySelector('[data-testid="framework-trigger"]') as HTMLButtonElement

  expect(disabledTrigger.disabled).toBe(true)
  disabledTrigger.click()
  await nextTick()
  expect(document.body.querySelector('[data-slot="select-content"]')).toBeNull()

  cleanup()
  const invalid = createFixture({ invalid: true })
  const { content, trigger } = await openSelect(invalid.Fixture)
  expect(getComputedStyle(trigger).getPropertyValue('--select-trigger-border').trim()).toBe('oklch(0.577 0.245 27.325)')

  ;(document.activeElement as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'r' }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve))
  expect((document.activeElement as HTMLElement).textContent).toContain('React')

  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--select-content-bg').trim()).toBe('oklch(0.205 0 0)')
})
