import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Command from '../src/components/command/Command.vue'
import CommandItem from '../src/components/command/CommandItem.vue'
import CommandList from '../src/components/command/CommandList.vue'
import CommandEmpty from '../src/components/command/CommandEmpty.vue'
import CommandGroup from '../src/components/command/CommandGroup.vue'
import CommandInput from '../src/components/command/CommandInput.vue'
import CommandDialog from '../src/components/command/CommandDialog.vue'
import CommandShortcut from '../src/components/command/CommandShortcut.vue'
import CommandSeparator from '../src/components/command/CommandSeparator.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

interface FixtureOptions {
  ignoreFilter?: boolean
}

function createFixture(options: FixtureOptions = {}) {
  const selected = ref<string[]>([])

  const Fixture = defineComponent({
    setup: () => () => h(Command, { ignoreFilter: options.ignoreFilter }, {
      default: () => [
        h(CommandInput, { 'data-testid': 'command-input' }),
        h(CommandList, { class: 'custom-list' }, {
          default: () => [
            h(CommandEmpty),
            h(CommandGroup, { heading: '导航' }, {
              default: () => [
                h(CommandItem, {
                  value: 'home',
                  onSelect: () => selected.value.push('home')
                }, {
                  default: () => ['首页', h(CommandShortcut, {}, { default: () => 'G H' })]
                }),
                h(CommandItem, {
                  value: 'components',
                  onSelect: () => selected.value.push('components')
                }, {
                  default: () => '组件'
                })
              ]
            }),
            h(CommandSeparator),
            h(CommandGroup, { heading: '操作' }, {
              default: () => h(CommandItem, { disabled: true, value: 'publish' }, {
                default: () => '发布'
              })
            })
          ]
        })
      ]
    })
  })

  return { Fixture, selected }
}

it('渲染稳定槽位、默认文案、分组标题与调用方类名', () => {
  const { Fixture } = createFixture()
  const page = render(Fixture)

  const root = page.container.querySelector('[data-slot="command"]') as HTMLElement
  const input = page.container.querySelector('[data-slot="command-input"]') as HTMLInputElement
  const list = page.container.querySelector('[data-slot="command-list"]') as HTMLElement

  expect(root.classList).toContain('command')
  expect(input.placeholder).toBe('输入命令或搜索…')
  expect(page.container.querySelector('[data-slot="command-input-icon"]')).not.toBeNull()
  expect(list.classList).toContain('command__list')
  expect(list.classList).toContain('custom-list')
  expect(page.container.querySelector('[data-slot="command-group-heading"]')?.textContent).toBe('导航')
  expect(page.container.querySelector('[data-slot="command-shortcut"]')?.textContent).toBe('G H')
  expect(page.container.querySelector('[data-slot="command-empty"]')?.textContent).toContain('没有匹配的命令')
})

it('筛选、空态和 ignoreFilter 外部筛选模式符合 Reka 契约', async () => {
  const { Fixture } = createFixture()
  const page = render(Fixture)
  const input = page.container.querySelector('[data-testid="command-input"]') as HTMLInputElement

  input.value = '组件'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  expect(page.container.querySelectorAll('[data-slot="command-item"]')).toHaveLength(1)
  expect(page.container.querySelector('[data-slot="command-item"]')?.textContent).toContain('组件')

  input.value = '不存在'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  const empty = page.container.querySelector('[data-slot="command-empty"]') as HTMLElement
  expect(getComputedStyle(empty).display).toBe('flex')

  cleanup()
  const manual = createFixture({ ignoreFilter: true })
  const manualPage = render(manual.Fixture)
  const manualInput = manualPage.container.querySelector('[data-testid="command-input"]') as HTMLInputElement

  manualInput.value = '不存在'
  manualInput.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  expect(manualPage.container.querySelectorAll('[data-slot="command-item"]')).toHaveLength(3)
})

it('项目选择只派发 select，不写入选择状态，也不会关闭内联列表', async () => {
  const { Fixture, selected } = createFixture()
  const page = render(Fixture)
  const input = page.container.querySelector('[data-testid="command-input"]') as HTMLInputElement

  input.focus()
  input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  const firstItem = page.container.querySelector('[data-slot="command-item"]') as HTMLElement
  firstItem.click()
  await nextTick()

  expect(selected.value).toEqual(['home'])
  expect(firstItem.getAttribute('data-state')).toBe('unchecked')
  expect(page.container.querySelector('[data-slot="command-list"]')).not.toBeNull()
})

it('禁用项目不可选，并且高亮、明暗主题样式遵循组件 Token', async () => {
  const { Fixture, selected } = createFixture()
  const page = render(Fixture)
  const items = Array.from(page.container.querySelectorAll('[data-slot="command-item"]')) as HTMLElement[]

  items[2].click()
  await nextTick()
  expect(selected.value).toEqual([])

  items[0].setAttribute('data-highlighted', '')
  expect(getComputedStyle(items[0]).backgroundColor).toBe(
    getComputedStyle(items[0]).getPropertyValue('--accent').trim()
  )

  document.documentElement.dataset.theme = 'dark'
  const root = page.container.querySelector('[data-slot="command"]') as HTMLElement
  expect(getComputedStyle(root).getPropertyValue('--command-bg').trim()).toBe('oklch(0.205 0 0)')
})

it('commandDialog Teleport、可访问文案和关闭行为均由 Reka Dialog 管理', async () => {
  const open = ref(false)
  const Fixture = defineComponent({
    setup: () => () => h('div', {}, [
      h('button', {
        onClick: () => {
          open.value = true
        }
      }, '打开'),
      h(CommandDialog, {
        'open': open.value,
        'onUpdate:open': (nextOpen: boolean) => {
          open.value = nextOpen
        }
      }, {
        default: () => h(Command, {}, {
          default: () => [
            h(CommandInput),
            h(CommandList, {}, { default: () => h(CommandItem, { value: 'open' }, { default: () => '打开文件' }) })
          ]
        })
      })
    ])
  })
  const page = render(Fixture)
  const trigger = page.container.querySelector('button') as HTMLButtonElement

  trigger.click()
  await nextTick()
  await nextTick()

  const content = document.body.querySelector('[data-slot="command-dialog-content"]') as HTMLElement
  expect(document.body.contains(content)).toBe(true)
  expect(content.getAttribute('role')).toBe('dialog')
  expect(content.querySelector('[data-slot="command-dialog-title"]')?.textContent).toBe('命令面板')
  expect(content.querySelector('[data-slot="command-dialog-description"]')?.textContent).toBe('搜索并执行命令。')
  expect(content.getAttribute('data-state')).toBe('open')

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(open.value).toBe(false)
})
