import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Menubar from '../src/components/menubar/Menubar.vue'
import MenubarSub from '../src/components/menubar/MenubarSub.vue'
import MenubarItem from '../src/components/menubar/MenubarItem.vue'
import MenubarMenu from '../src/components/menubar/MenubarMenu.vue'
import MenubarArrow from '../src/components/menubar/MenubarArrow.vue'
import MenubarGroup from '../src/components/menubar/MenubarGroup.vue'
import MenubarLabel from '../src/components/menubar/MenubarLabel.vue'
import MenubarContent from '../src/components/menubar/MenubarContent.vue'
import MenubarTrigger from '../src/components/menubar/MenubarTrigger.vue'
import MenubarShortcut from '../src/components/menubar/MenubarShortcut.vue'
import MenubarRadioItem from '../src/components/menubar/MenubarRadioItem.vue'
import MenubarSeparator from '../src/components/menubar/MenubarSeparator.vue'
import MenubarRadioGroup from '../src/components/menubar/MenubarRadioGroup.vue'
import MenubarSubContent from '../src/components/menubar/MenubarSubContent.vue'
import MenubarSubTrigger from '../src/components/menubar/MenubarSubTrigger.vue'
import MenubarCheckboxItem from '../src/components/menubar/MenubarCheckboxItem.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createFixture() {
  const activeMenu = ref('')
  const checked = ref(false)
  const profile = ref('个人')
  const selected = ref(false)

  const Fixture = defineComponent({
    setup: () => () => h(Menubar, {
      'modelValue': activeMenu.value,
      'loop': true,
      'class': 'custom-menubar',
      'onUpdate:modelValue': (nextValue: string) => {
        activeMenu.value = nextValue
      }
    }, {
      default: () => [
        h(MenubarMenu, { value: 'file' }, {
          default: () => [
            h(MenubarTrigger, { 'class': 'custom-trigger', 'data-testid': 'file-trigger' }, { default: () => '文件' }),
            h(MenubarContent, { class: 'custom-content' }, {
              default: () => [
                h(MenubarArrow),
                h(MenubarGroup, {}, {
                  default: () => [
                    h(MenubarLabel, {}, { default: () => '操作' }),
                    h(MenubarItem, {
                      'data-testid': 'copy-item',
                      'onSelect': () => {
                        selected.value = true
                      }
                    }, {
                      default: () => ['复制', h(MenubarShortcut, {}, { default: () => '⌘C' })]
                    }),
                    h(MenubarItem, { disabled: true }, { default: () => '不可用操作' })
                  ]
                }),
                h(MenubarSeparator),
                h(MenubarCheckboxItem, {
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
                h(MenubarRadioGroup, {
                  'modelValue': profile.value,
                  'onUpdate:modelValue': (nextProfile: string) => {
                    profile.value = nextProfile
                  }
                }, {
                  default: () => [
                    h(MenubarRadioItem, { value: '工作', onSelect: (event: Event) => event.preventDefault() }, { default: () => '工作' }),
                    h(MenubarRadioItem, { value: '个人' }, { default: () => '个人' })
                  ]
                }),
                h(MenubarSeparator),
                h(MenubarSub, {}, {
                  default: () => [
                    h(MenubarSubTrigger, { 'data-testid': 'sub-trigger' }, { default: () => '更多工具' }),
                    h(MenubarSubContent, {}, {
                      default: () => h(MenubarItem, { 'data-testid': 'sub-item' }, { default: () => '开发者工具' })
                    })
                  ]
                })
              ]
            })
          ]
        }),
        h(MenubarMenu, { value: 'edit' }, {
          default: () => [
            h(MenubarTrigger, { 'data-testid': 'edit-trigger' }, { default: () => '编辑' }),
            h(MenubarContent, {}, {
              default: () => h(MenubarItem, { 'data-testid': 'undo-item' }, { default: () => '撤销' })
            })
          ]
        }),
        h(MenubarMenu, { value: 'profile' }, {
          default: () => [
            h(MenubarTrigger, { 'data-testid': 'profile-trigger' }, { default: () => '个人资料' }),
            h(MenubarContent, {}, {
              default: () => h(MenubarItem, { 'data-testid': 'profile-item' }, { default: () => '账户设置' })
            })
          ]
        }),
        h(MenubarMenu, { value: 'disabled' }, {
          default: () => [
            h(MenubarTrigger, { 'disabled': true, 'data-testid': 'disabled-trigger' }, { default: () => '已禁用' }),
            h(MenubarContent, {}, {
              default: () => h(MenubarItem, {}, { default: () => '不可用菜单' })
            })
          ]
        })
      ]
    })
  })

  return { Fixture, activeMenu, checked, profile, selected }
}

async function openMenubar(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="file-trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  await nextTick()
  await nextTick()

  const content = document.body.querySelector('[data-slot="menubar-content"]') as HTMLElement
  return { content, page, trigger }
}

it('外部 v-model 可控制当前打开的顶级菜单', async () => {
  const fixture = createFixture()
  render(fixture.Fixture)

  expect(document.body.querySelector('[data-slot="menubar-content"]')).toBeNull()
  fixture.activeMenu.value = 'file'
  await nextTick()
  await nextTick()
  expect(document.body.querySelector('[data-slot="menubar-content"]')).not.toBeNull()

  fixture.activeMenu.value = ''
  await nextTick()
  expect(fixture.activeMenu.value).toBe('')
})

it('触发器可 asChild 合并行为至唯一子元素', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(Menubar, {}, {
      default: () => h(MenubarMenu, { value: 'file' }, {
        default: () => [
          h(MenubarTrigger, { asChild: true }, {
            default: () => h('button', { 'class': 'custom-button', 'data-testid': 'as-child-trigger' }, '文件')
          }),
          h(MenubarContent, {}, { default: () => h(MenubarItem, {}, { default: () => '操作' }) })
        ]
      })
    })
  })

  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="as-child-trigger"]') as HTMLButtonElement

  expect(trigger.classList).toContain('menubar__trigger')
  expect(trigger.classList).toContain('custom-button')
  trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  await nextTick()
  await nextTick()
  expect(document.body.querySelector('[data-slot="menubar-content"]')).not.toBeNull()
})

it.each(['Enter', ' ', 'ArrowDown'])('触发器按下 %s 可打开菜单', async key => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const trigger = page.container.querySelector('[data-testid="file-trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }))
  await nextTick()
  await nextTick()

  expect(fixture.activeMenu.value).toBe('file')
  expect(document.body.querySelector('[data-slot="menubar-content"]')).not.toBeNull()
})

it('自动 Teleport，并保留稳定槽位、调用方类名与 Nova 样式', async () => {
  const fixture = createFixture()
  const { content, page, trigger } = await openMenubar(fixture.Fixture)
  const root = page.container.querySelector('[data-slot="menubar"]') as HTMLElement

  expect(fixture.activeMenu.value).toBe('file')
  expect(root.classList).toContain('menubar')
  expect(root.classList).toContain('custom-menubar')
  expect(trigger.classList).toContain('menubar__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(document.body.contains(content)).toBe(true)
  expect(content.classList).toContain('menubar__content')
  expect(content.classList).toContain('custom-content')
  expect(content.querySelector('[data-slot="menubar-arrow"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="menubar-group"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="menubar-label"]')?.textContent).toBe('操作')
  expect(content.querySelector('[data-slot="menubar-shortcut"]')?.textContent).toBe('⌘C')
  expect(content.querySelector('[data-slot="menubar-separator"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="menubar-sub-trigger-icon"]')).not.toBeNull()
  expect(getComputedStyle(root).height).toBe('32px')
  expect(getComputedStyle(content).minWidth).toBe('160px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).boxShadow).not.toBe('none')
})

it('左右方向键切换顶级菜单，并在 loop 下跳过禁用项回到首项', async () => {
  const fixture = createFixture()
  const { content } = await openMenubar(fixture.Fixture)

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  await nextTick()
  await nextTick()
  expect(fixture.activeMenu.value).toBe('edit')
  expect(document.body.querySelector('[data-testid="undo-item"]')).not.toBeNull()

  const editContent = document.body.querySelector('[data-testid="undo-item"]')?.closest('[data-slot="menubar-content"]') as HTMLElement
  editContent.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  await nextTick()
  expect(fixture.activeMenu.value).toBe('profile')

  const profileContent = document.body.querySelector('[data-testid="profile-item"]')?.closest('[data-slot="menubar-content"]') as HTMLElement
  profileContent.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
  await nextTick()
  expect(fixture.activeMenu.value).toBe('file')
})

it('菜单项选择后清除触发器选中背景，Escape 仍关闭并恢复焦点', async () => {
  const fixture = createFixture()
  const { content: initialContent, trigger } = await openMenubar(fixture.Fixture)
  let content = initialContent
  const item = content.querySelector('[data-testid="copy-item"]') as HTMLElement

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  expect(document.activeElement).toBe(item)
  item.setAttribute('data-highlighted', '')
  expect(getComputedStyle(item).backgroundColor).toBe(getComputedStyle(item).getPropertyValue('--accent').trim())

  item.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }))
  await nextTick()
  await nextTick()
  expect(fixture.selected.value).toBe(true)
  expect(fixture.activeMenu.value).toBe('')
  expect(trigger.getAttribute('data-state')).toBe('closed')
  expect(getComputedStyle(trigger).backgroundColor).not.toBe(getComputedStyle(trigger).getPropertyValue('--accent').trim())
  expect(getComputedStyle(trigger).boxShadow).toBe('none')

  trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  await nextTick()
  await nextTick()
  content = document.body.querySelector('[data-slot="menubar-content"]') as HTMLElement
  trigger.focus()
  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(fixture.activeMenu.value).toBe('')
  expect(document.activeElement).toBe(trigger)
})

it('菜单打开时指针可反向切换顶级菜单，关闭或禁用状态不会触发切换', async () => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const fileTrigger = page.container.querySelector('[data-testid="file-trigger"]') as HTMLButtonElement
  const editTrigger = page.container.querySelector('[data-testid="edit-trigger"]') as HTMLButtonElement
  const profileTrigger = page.container.querySelector('[data-testid="profile-trigger"]') as HTMLButtonElement
  const disabledTrigger = page.container.querySelector('[data-testid="disabled-trigger"]') as HTMLButtonElement

  profileTrigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  await nextTick()
  expect(fixture.activeMenu.value).toBe('')

  fileTrigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  await nextTick()
  await nextTick()
  profileTrigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  await nextTick()
  await nextTick()
  expect(fixture.activeMenu.value).toBe('profile')
  expect(document.body.querySelector('[data-testid="profile-item"]')).not.toBeNull()

  editTrigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  await nextTick()
  await nextTick()
  expect(fixture.activeMenu.value).toBe('edit')
  expect(document.body.querySelector('[data-testid="undo-item"]')).not.toBeNull()
  expect(editTrigger.getAttribute('data-state')).toBe('open')

  disabledTrigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  await nextTick()
  expect(fixture.activeMenu.value).toBe('edit')
})

it('禁用、Checkbox、Radio 与自定义指示器遵循 Reka 状态契约', async () => {
  const fixture = createFixture()
  const { content } = await openMenubar(fixture.Fixture)
  const disabled = Array.from(content.querySelectorAll('[data-slot="menubar-item"]')).find(item => item.textContent === '不可用操作') as HTMLElement
  const checkbox = content.querySelector('[data-testid="checkbox-item"]') as HTMLElement

  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  expect(getComputedStyle(disabled).pointerEvents).toBe('none')
  checkbox.click()
  await nextTick()
  expect(fixture.checked.value).toBe(true)
  expect(checkbox.getAttribute('data-state')).toBe('checked')
  expect(checkbox.querySelector('[data-testid="custom-indicator"]')).not.toBeNull()

  const radio = content.querySelector('[data-slot="menubar-radio-item"]') as HTMLElement
  radio.click()
  await nextTick()
  expect(fixture.profile.value).toBe('工作')
  expect(radio.getAttribute('data-state')).toBe('checked')
})

it('子菜单内容自动 Teleport，并在深色主题下消费 Popover Token', async () => {
  const fixture = createFixture()
  const { content } = await openMenubar(fixture.Fixture)
  const subTrigger = content.querySelector('[data-testid="sub-trigger"]') as HTMLElement

  subTrigger.click()
  await nextTick()
  await nextTick()

  const subContent = document.body.querySelector('[data-slot="menubar-sub-content"]') as HTMLElement
  expect(subContent).not.toBeNull()
  expect(document.body.contains(subContent)).toBe(true)
  expect(subContent.querySelector('[data-testid="sub-item"]')?.textContent).toBe('开发者工具')

  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--menubar-content-bg').trim()).toBe('oklch(0.205 0 0)')
})
