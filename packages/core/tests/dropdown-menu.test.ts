import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import DropdownMenu from '../src/components/dropdown-menu/DropdownMenu.vue'
import DropdownMenuSub from '../src/components/dropdown-menu/DropdownMenuSub.vue'
import DropdownMenuItem from '../src/components/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuArrow from '../src/components/dropdown-menu/DropdownMenuArrow.vue'
import DropdownMenuGroup from '../src/components/dropdown-menu/DropdownMenuGroup.vue'
import DropdownMenuLabel from '../src/components/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuContent from '../src/components/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuTrigger from '../src/components/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuShortcut from '../src/components/dropdown-menu/DropdownMenuShortcut.vue'
import DropdownMenuRadioItem from '../src/components/dropdown-menu/DropdownMenuRadioItem.vue'
import DropdownMenuSeparator from '../src/components/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuRadioGroup from '../src/components/dropdown-menu/DropdownMenuRadioGroup.vue'
import DropdownMenuSubContent from '../src/components/dropdown-menu/DropdownMenuSubContent.vue'
import DropdownMenuSubTrigger from '../src/components/dropdown-menu/DropdownMenuSubTrigger.vue'
import DropdownMenuCheckboxItem from '../src/components/dropdown-menu/DropdownMenuCheckboxItem.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createFixture() {
  const open = ref(false)
  const checked = ref(false)
  const copySelected = ref(false)
  const theme = ref('system')

  const Fixture = defineComponent({
    setup: () => () => h(DropdownMenu, {
      'open': open.value,
      'onUpdate:open': (nextOpen: boolean) => {
        open.value = nextOpen
      }
    }, {
      default: () => [
        h(DropdownMenuTrigger, { 'class': 'custom-trigger', 'data-testid': 'trigger' }, {
          default: () => '打开菜单'
        }),
        h(DropdownMenuContent, { class: 'custom-content' }, {
          default: () => [
            h(DropdownMenuArrow),
            h(DropdownMenuGroup, {}, {
              default: () => [
                h(DropdownMenuLabel, {}, { default: () => '操作' }),
                h(DropdownMenuItem, {
                  'data-testid': 'copy-item',
                  'onSelect': () => {
                    copySelected.value = true
                  }
                }, {
                  default: () => ['复制', h(DropdownMenuShortcut, {}, { default: () => '⌘C' })]
                }),
                h(DropdownMenuItem, { disabled: true }, { default: () => '不可用操作' })
              ]
            }),
            h(DropdownMenuSeparator),
            h(DropdownMenuCheckboxItem, {
              'modelValue': checked.value,
              'onUpdate:modelValue': (nextChecked: boolean) => {
                checked.value = nextChecked
              },
              'onSelect': (event: Event) => event.preventDefault(),
              'data-testid': 'checkbox-item'
            }, {
              default: () => '显示状态栏',
              indicator: () => h('span', { 'data-testid': 'custom-indicator' }, '✓')
            }),
            h(DropdownMenuRadioGroup, {
              'modelValue': theme.value,
              'onUpdate:modelValue': (nextTheme: string) => {
                theme.value = nextTheme
              }
            }, {
              default: () => [
                h(DropdownMenuRadioItem, { value: 'light', onSelect: (event: Event) => event.preventDefault() }, { default: () => '浅色' }),
                h(DropdownMenuRadioItem, { value: 'system' }, { default: () => '系统' })
              ]
            }),
            h(DropdownMenuSeparator),
            h(DropdownMenuSub, {}, {
              default: () => [
                h(DropdownMenuSubTrigger, { 'data-testid': 'sub-trigger' }, { default: () => '更多工具' }),
                h(DropdownMenuSubContent, {}, {
                  default: () => h(DropdownMenuItem, { 'data-testid': 'sub-item' }, { default: () => '开发者工具' })
                })
              ]
            })
          ]
        })
      ]
    })
  })

  return { Fixture, checked, copySelected, open, theme }
}

async function openDropdownMenu(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  trigger.click()
  await nextTick()
  await nextTick()

  const content = document.body.querySelector('[data-slot="dropdown-menu-content"]') as HTMLElement
  return { content, page, trigger }
}

it('外部 v-model:open 可控制 Reka 根状态', async () => {
  const fixture = createFixture()
  render(fixture.Fixture)

  expect(document.body.querySelector('[data-slot="dropdown-menu-content"]')).toBeNull()
  fixture.open.value = true
  await nextTick()
  await nextTick()
  expect(document.body.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeNull()

  fixture.open.value = false
  await nextTick()
  expect(fixture.open.value).toBe(false)
})

it('触发器可 asChild 合并行为至唯一子元素', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(DropdownMenu, {}, {
      default: () => [
        h(DropdownMenuTrigger, { asChild: true }, {
          default: () => h('button', { 'class': 'custom-button', 'data-testid': 'as-child-trigger' }, '打开菜单')
        }),
        h(DropdownMenuContent, {}, { default: () => h(DropdownMenuItem, {}, { default: () => '操作' }) })
      ]
    })
  })

  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="as-child-trigger"]') as HTMLButtonElement

  expect(trigger.classList).toContain('dropdown-menu__trigger')
  expect(trigger.classList).toContain('custom-button')
  trigger.click()
  await nextTick()
  await nextTick()
  expect(document.body.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeNull()
})

it.each(['Enter', ' ', 'ArrowDown'])('触发器按下 %s 可打开菜单', async key => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }))
  await nextTick()
  await nextTick()

  expect(fixture.open.value).toBe(true)
  expect(document.body.querySelector('[data-slot="dropdown-menu-content"]')).not.toBeNull()
})

it('点击触发、自动 Teleport，并保留稳定槽位、调用方类名与 Nova 样式', async () => {
  const fixture = createFixture()
  const { content, trigger } = await openDropdownMenu(fixture.Fixture)

  expect(fixture.open.value).toBe(true)
  expect(trigger.classList).toContain('dropdown-menu__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(document.body.contains(content)).toBe(true)
  expect(content.classList).toContain('dropdown-menu__content')
  expect(content.classList).toContain('custom-content')
  expect(content.querySelector('[data-slot="dropdown-menu-arrow"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="dropdown-menu-group"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="dropdown-menu-label"]')?.textContent).toBe('操作')
  expect(content.querySelector('[data-slot="dropdown-menu-shortcut"]')?.textContent).toBe('⌘C')
  expect(content.querySelector('[data-slot="dropdown-menu-separator"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="dropdown-menu-sub-trigger-icon"]')).not.toBeNull()
  expect(getComputedStyle(content).minWidth).toBe('160px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).boxShadow).not.toBe('none')
  expect(getComputedStyle(content.querySelector('[data-testid="copy-item"]') as HTMLElement).paddingTop).toBe('4px')
  expect(getComputedStyle(content.querySelector('[data-testid="copy-item"]') as HTMLElement).paddingLeft).toBe('6px')
})

it('菜单项支持键盘导航、Enter 选择和 Escape 关闭', async () => {
  const fixture = createFixture()
  const { content } = await openDropdownMenu(fixture.Fixture)
  const item = content.querySelector('[data-testid="copy-item"]') as HTMLElement

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  expect(document.activeElement).toBe(item)
  item.setAttribute('data-highlighted', '')
  expect(getComputedStyle(item).backgroundColor).toBe(getComputedStyle(item).getPropertyValue('--accent').trim())

  item.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }))
  await nextTick()
  expect(fixture.copySelected.value).toBe(true)

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(fixture.open.value).toBe(false)
})

it('禁用、Checkbox、Radio 与自定义指示器遵循 Reka 状态契约', async () => {
  const fixture = createFixture()
  const { content } = await openDropdownMenu(fixture.Fixture)
  const disabled = Array.from(content.querySelectorAll('[data-slot="dropdown-menu-item"]')).find(item => item.textContent === '不可用操作') as HTMLElement
  const checkbox = content.querySelector('[data-testid="checkbox-item"]') as HTMLElement

  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  expect(getComputedStyle(disabled).pointerEvents).toBe('none')
  checkbox.click()
  await nextTick()
  expect(fixture.checked.value).toBe(true)
  expect(checkbox.getAttribute('data-state')).toBe('checked')
  expect(checkbox.querySelector('[data-testid="custom-indicator"]')).not.toBeNull()

  const radio = content.querySelector('[data-slot="dropdown-menu-radio-item"]') as HTMLElement
  radio.click()
  await nextTick()
  expect(fixture.theme.value).toBe('light')
  expect(radio.getAttribute('data-state')).toBe('checked')
})

it('子菜单内容自动 Teleport，并在深色主题下消费 Popover Token', async () => {
  const { Fixture } = createFixture()
  const { content } = await openDropdownMenu(Fixture)
  const subTrigger = content.querySelector('[data-testid="sub-trigger"]') as HTMLElement

  subTrigger.click()
  await nextTick()
  await nextTick()

  const subContent = document.body.querySelector('[data-slot="dropdown-menu-sub-content"]') as HTMLElement
  expect(subContent).not.toBeNull()
  expect(document.body.contains(subContent)).toBe(true)
  expect(subContent.querySelector('[data-testid="sub-item"]')?.textContent).toBe('开发者工具')

  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--dropdown-menu-content-bg').trim()).toBe('oklch(0.205 0 0)')
})
