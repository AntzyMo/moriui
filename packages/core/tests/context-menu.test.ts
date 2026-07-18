import { afterEach, expect, it } from 'vite-plus/test'

import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import ContextMenu from '../src/components/context-menu/ContextMenu.vue'
import ContextMenuSub from '../src/components/context-menu/ContextMenuSub.vue'
import ContextMenuItem from '../src/components/context-menu/ContextMenuItem.vue'
import ContextMenuGroup from '../src/components/context-menu/ContextMenuGroup.vue'
import ContextMenuLabel from '../src/components/context-menu/ContextMenuLabel.vue'
import ContextMenuContent from '../src/components/context-menu/ContextMenuContent.vue'
import ContextMenuTrigger from '../src/components/context-menu/ContextMenuTrigger.vue'
import ContextMenuShortcut from '../src/components/context-menu/ContextMenuShortcut.vue'
import ContextMenuRadioItem from '../src/components/context-menu/ContextMenuRadioItem.vue'
import ContextMenuSeparator from '../src/components/context-menu/ContextMenuSeparator.vue'
import ContextMenuRadioGroup from '../src/components/context-menu/ContextMenuRadioGroup.vue'
import ContextMenuSubContent from '../src/components/context-menu/ContextMenuSubContent.vue'
import ContextMenuSubTrigger from '../src/components/context-menu/ContextMenuSubTrigger.vue'
import ContextMenuCheckboxItem from '../src/components/context-menu/ContextMenuCheckboxItem.vue'

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
    setup: () => () =>
      h(
        ContextMenu,
        {
          'open': open.value,
          'onUpdate:open': (nextOpen: boolean) => {
            open.value = nextOpen
          }
        },
        {
          default: () => [
            h(
              ContextMenuTrigger,
              { 'class': 'custom-trigger', 'data-testid': 'trigger' },
              {
                default: () => '右键打开'
              }
            ),
            h(
              ContextMenuContent,
              { class: 'custom-content' },
              {
                default: () => [
                  h(
                    ContextMenuGroup,
                    {},
                    {
                      default: () => [
                        h(ContextMenuLabel, {}, { default: () => '操作' }),
                        h(
                          ContextMenuItem,
                          {
                            'data-testid': 'copy-item',
                            'onSelect': () => {
                              copySelected.value = true
                            }
                          },
                          {
                            default: () => [
                              '复制',
                              h(ContextMenuShortcut, {}, { default: () => '⌘C' })
                            ]
                          }
                        ),
                        h(ContextMenuItem, { disabled: true }, { default: () => '不可用操作' })
                      ]
                    }
                  ),
                  h(ContextMenuSeparator),
                  h(
                    ContextMenuCheckboxItem,
                    {
                      'modelValue': checked.value,
                      'onUpdate:modelValue': (nextChecked: boolean) => {
                        checked.value = nextChecked
                      },
                      'onSelect': (event: Event) => event.preventDefault(),
                      'data-testid': 'checkbox-item'
                    },
                    {
                      default: () => '显示状态栏',
                      indicator: () => h('span', { 'data-testid': 'custom-indicator' }, '✓')
                    }
                  ),
                  h(
                    ContextMenuRadioGroup,
                    {
                      'modelValue': theme.value,
                      'onUpdate:modelValue': (nextTheme: string) => {
                        theme.value = nextTheme
                      }
                    },
                    {
                      default: () => [
                        h(
                          ContextMenuRadioItem,
                          { value: 'light', onSelect: (event: Event) => event.preventDefault() },
                          { default: () => '浅色' }
                        ),
                        h(ContextMenuRadioItem, { value: 'system' }, { default: () => '系统' })
                      ]
                    }
                  ),
                  h(ContextMenuSeparator),
                  h(
                    ContextMenuSub,
                    {},
                    {
                      default: () => [
                        h(
                          ContextMenuSubTrigger,
                          { 'data-testid': 'sub-trigger' },
                          { default: () => '更多工具' }
                        ),
                        h(
                          ContextMenuSubContent,
                          {},
                          {
                            default: () =>
                              h(
                                ContextMenuItem,
                                { 'data-testid': 'sub-item' },
                                { default: () => '开发者工具' }
                              )
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
  })

  return { Fixture, checked, copySelected, open, theme }
}

async function openContextMenu(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLElement

  trigger.dispatchEvent(
    new MouseEvent('contextmenu', {
      bubbles: true,
      button: 2,
      clientX: 120,
      clientY: 80
    })
  )
  await nextTick()
  await nextTick()

  const content = document.body.querySelector('[data-slot="context-menu-content"]') as HTMLElement
  return { content, page, trigger }
}

it('外部 v-model:open 可控制 Reka 根状态', async () => {
  const fixture = createFixture()
  render(fixture.Fixture)

  expect(document.body.querySelector('[data-slot="context-menu-content"]')).toBeNull()
  fixture.open.value = true
  await nextTick()
  await nextTick()
  expect(document.body.querySelector('[data-slot="context-menu-content"]')).not.toBeNull()

  fixture.open.value = false
  await nextTick()
  expect(fixture.open.value).toBe(false)
})

it('右键触发、同步 v-model、自动 Teleport，并保留稳定槽位与调用方类名', async () => {
  const fixture = createFixture()
  const { content, trigger } = await openContextMenu(fixture.Fixture)

  expect(fixture.open.value).toBe(true)
  expect(trigger.classList).toContain('context-menu__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(content).not.toBeNull()
  expect(document.body.contains(content)).toBe(true)
  expect(content.classList).toContain('context-menu__content')
  expect(content.classList).toContain('custom-content')
  expect(content.querySelector('[data-slot="context-menu-group"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="context-menu-label"]')?.textContent).toBe('操作')
  expect(content.querySelector('[data-slot="context-menu-shortcut"]')?.textContent).toBe('⌘C')
  expect(content.querySelector('[data-slot="context-menu-separator"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="context-menu-sub-trigger-icon"]')).not.toBeNull()
  expect(getComputedStyle(content).minWidth).toBe('160px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).boxShadow).not.toBe('none')
  expect(
    getComputedStyle(content.querySelector('[data-testid="copy-item"]') as HTMLElement).paddingTop
  ).toBe('4px')
  expect(
    getComputedStyle(content.querySelector('[data-testid="copy-item"]') as HTMLElement).paddingLeft
  ).toBe('6px')
})

it('普通菜单项可用键盘导航、Enter 选择，并由 Escape 关闭', async () => {
  const fixture = createFixture()
  const { content } = await openContextMenu(fixture.Fixture)
  const item = content.querySelector('[data-testid="copy-item"]') as HTMLElement

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  expect(document.activeElement).toBe(item)
  item.setAttribute('data-highlighted', '')
  expect(getComputedStyle(item).backgroundColor).toBe(
    getComputedStyle(item).getPropertyValue('--accent').trim()
  )

  item.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }))
  await nextTick()
  expect(fixture.copySelected.value).toBe(true)

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(fixture.open.value).toBe(false)
})

it('禁用、Checkbox、Radio 与自定义指示器遵循 Reka 状态契约', async () => {
  const fixture = createFixture()
  const { content } = await openContextMenu(fixture.Fixture)
  const disabled = Array.from(content.querySelectorAll('[data-slot="context-menu-item"]')).find(
    item => item.textContent === '不可用操作'
  ) as HTMLElement
  const checkbox = content.querySelector('[data-testid="checkbox-item"]') as HTMLElement

  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  expect(getComputedStyle(disabled).pointerEvents).toBe('none')
  checkbox.click()
  await nextTick()
  expect(fixture.checked.value).toBe(true)
  expect(checkbox.getAttribute('data-state')).toBe('checked')
  expect(checkbox.querySelector('[data-testid="custom-indicator"]')).not.toBeNull()

  const radio = content.querySelector('[data-slot="context-menu-radio-item"]') as HTMLElement
  radio.click()
  await nextTick()
  expect(fixture.theme.value).toBe('light')
  expect(radio.getAttribute('data-state')).toBe('checked')
})

it('子菜单内容自动 Teleport，并在深色主题下消费 Popover Token', async () => {
  const { Fixture } = createFixture()
  const { content } = await openContextMenu(Fixture)
  const subTrigger = content.querySelector('[data-testid="sub-trigger"]') as HTMLElement

  subTrigger.click()
  await nextTick()
  await nextTick()

  const subContent = document.body.querySelector(
    '[data-slot="context-menu-sub-content"]'
  ) as HTMLElement
  expect(subContent).not.toBeNull()
  expect(document.body.contains(subContent)).toBe(true)
  expect(subContent.querySelector('[data-testid="sub-item"]')?.textContent).toBe('开发者工具')

  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--context-menu-content-bg').trim()).toBe(
    'oklch(0.205 0 0)'
  )
})
