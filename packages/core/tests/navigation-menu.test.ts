import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import NavigationMenu from '../src/components/navigation-menu/NavigationMenu.vue'
import NavigationMenuSub from '../src/components/navigation-menu/NavigationMenuSub.vue'
import NavigationMenuItem from '../src/components/navigation-menu/NavigationMenuItem.vue'
import NavigationMenuLink from '../src/components/navigation-menu/NavigationMenuLink.vue'
import NavigationMenuList from '../src/components/navigation-menu/NavigationMenuList.vue'
import NavigationMenuContent from '../src/components/navigation-menu/NavigationMenuContent.vue'
import NavigationMenuTrigger from '../src/components/navigation-menu/NavigationMenuTrigger.vue'
import NavigationMenuViewport from '../src/components/navigation-menu/NavigationMenuViewport.vue'
import NavigationMenuIndicator from '../src/components/navigation-menu/NavigationMenuIndicator.vue'

import './style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createFixture() {
  const activeItem = ref('')

  const Fixture = defineComponent({
    setup: () => () => h(NavigationMenu, {
      'modelValue': activeItem.value,
      'delayDuration': 0,
      'class': 'custom-navigation-menu',
      'onUpdate:modelValue': (value: string) => {
        activeItem.value = value
      }
    }, {
      default: () => h(NavigationMenuList, { class: 'custom-list' }, {
        default: () => [
          h(NavigationMenuItem, { value: 'products' }, {
            default: () => [
              h(NavigationMenuTrigger, { 'class': 'custom-trigger', 'data-testid': 'products-trigger' }, { default: () => '产品' }),
              h(NavigationMenuContent, { class: 'custom-content' }, {
                default: () => [
                  h(NavigationMenuLink, { 'href': '#components', 'data-testid': 'components-link' }, { default: () => '组件库' }),
                  h('button', { 'data-testid': 'content-button' }, '查看组件')
                ]
              })
            ]
          }),
          h(NavigationMenuItem, {}, {
            default: () => h(NavigationMenuLink, { 'active': true, 'href': '#overview', 'data-testid': 'overview-link' }, { default: () => '概览' })
          }),
          h(NavigationMenuItem, {}, {
            default: () => h(NavigationMenuLink, {
              'href': '#documentation',
              'data-testid': 'documentation-link',
              'onPointerenter': () => {
                activeItem.value = ''
              }
            }, { default: () => '文档' })
          }),
          h(NavigationMenuItem, { value: 'disabled' }, {
            default: () => [
              h(NavigationMenuTrigger, { 'disabled': true, 'data-testid': 'disabled-trigger' }, { default: () => '已禁用' }),
              h(NavigationMenuContent, {}, { default: () => '不可用内容' })
            ]
          }),
          h(NavigationMenuIndicator)
        ]
      })
    })
  })

  return { Fixture, activeItem }
}

function createSwitchingFixture() {
  const activeItem = ref('')

  const Fixture = defineComponent({
    setup: () => () => h(NavigationMenu, {
      'modelValue': activeItem.value,
      'delayDuration': 0,
      'onUpdate:modelValue': (value: string) => {
        activeItem.value = value
      }
    }, {
      default: () => h(NavigationMenuList, {}, {
        default: () => [
          h(NavigationMenuItem, { value: 'first' }, {
            default: () => [
              h(NavigationMenuTrigger, { 'data-testid': 'first-trigger' }, { default: () => '第一个' }),
              h(NavigationMenuContent, { class: 'w-64 p-3' }, { default: () => h('span', '第一个面板') })
            ]
          }),
          h(NavigationMenuItem, { value: 'second' }, {
            default: () => [
              h(NavigationMenuTrigger, { 'data-testid': 'second-trigger' }, { default: () => '第二个' }),
              h(NavigationMenuContent, { class: 'w-80 p-3' }, { default: () => h('span', '第二个面板') })
            ]
          })
        ]
      })
    })
  })

  return { Fixture, activeItem }
}

async function openNavigationMenu(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="products-trigger"]') as HTMLButtonElement

  trigger.click()
  await nextTick()
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  const viewport = page.container.querySelector('[data-slot="navigation-menu-viewport"]') as HTMLElement
  const content = viewport.querySelector('[data-slot="navigation-menu-content"]') as HTMLElement
  return { content, page, trigger, viewport }
}

it('外部 v-model 可控制当前打开项，并默认渲染 Viewport', async () => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const root = page.container.querySelector('[data-slot="navigation-menu"]') as HTMLElement

  expect(root.dataset.viewport).toBe('true')
  expect(page.container.querySelector('[data-slot="navigation-menu-content"]')).toBeNull()

  fixture.activeItem.value = 'products'
  await nextTick()
  await nextTick()

  expect(page.container.querySelector('[data-slot="navigation-menu-viewport"]')).not.toBeNull()
  expect(page.container.querySelector('[data-testid="components-link"]')).not.toBeNull()
})

it('默认 Viewport 承载内容，并保留稳定槽位、调用方类名和 Nova 样式', async () => {
  const fixture = createFixture()
  const { content, page, trigger, viewport } = await openNavigationMenu(fixture.Fixture)
  const root = page.container.querySelector('[data-slot="navigation-menu"]') as HTMLElement
  const list = page.container.querySelector('[data-slot="navigation-menu-list"]') as HTMLElement
  const indicator = page.container.querySelector('[data-slot="navigation-menu-indicator"]') as HTMLElement

  expect(fixture.activeItem.value).toBe('products')
  expect(root.classList).toContain('navigation-menu')
  expect(root.classList).toContain('custom-navigation-menu')
  expect(list.classList).toContain('custom-list')
  expect(trigger.classList).toContain('navigation-menu__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(trigger.querySelector('[data-slot="navigation-menu-trigger-icon"]')).toBeNull()
  expect(getComputedStyle(trigger, '::after').content).toBe('none')
  expect(content.classList).toContain('navigation-menu__content')
  expect(content.classList).toContain('custom-content')
  expect(content.dataset.viewport).toBe('auto')
  expect(viewport.contains(content)).toBe(true)
  expect(viewport.offsetWidth).toBeGreaterThan(0)
  expect(viewport.offsetHeight).toBeGreaterThan(0)
  expect(getComputedStyle(viewport).position).toBe('relative')
  expect(content.offsetHeight).toBeGreaterThan(0)
  expect(getComputedStyle(content).boxShadow).toBe('none')
  expect(indicator.querySelector('[data-slot="navigation-menu-indicator-mark"]')).not.toBeNull()
  expect(getComputedStyle(trigger).height).toBe('36px')
  expect(getComputedStyle(viewport).borderRadius).toBe('10px')
  expect(getComputedStyle(viewport).boxShadow).not.toBe('none')
})

it('鼠标悬停触发器后会显示具有实际尺寸的内容', async () => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const trigger = page.container.querySelector('[data-testid="products-trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
  trigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
  await new Promise(resolve => setTimeout(resolve, 20))
  await nextTick()
  await nextTick()

  const viewport = page.container.querySelector('[data-slot="navigation-menu-viewport"]') as HTMLElement
  const content = viewport.querySelector('[data-slot="navigation-menu-content"]') as HTMLElement
  expect(fixture.activeItem.value).toBe('products')
  expect(viewport.offsetHeight).toBeGreaterThan(0)
  expect(content.offsetHeight).toBeGreaterThan(0)
})

it('移入直达链接会立即关闭已打开的菜单，避免延迟关闭造成视觉闪动', async () => {
  const fixture = createFixture()
  const { page } = await openNavigationMenu(fixture.Fixture)
  const documentationLink = page.container.querySelector('[data-testid="documentation-link"]') as HTMLAnchorElement

  documentationLink.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
  await nextTick()

  expect(fixture.activeItem.value).toBe('')
})

it('窄屏切换选项时隐藏旧内容，避免堆叠成第二个下拉面板', async () => {
  const fixture = createSwitchingFixture()
  const page = render(fixture.Fixture)
  const firstTrigger = page.container.querySelector('[data-testid="first-trigger"]') as HTMLButtonElement
  const secondTrigger = page.container.querySelector('[data-testid="second-trigger"]') as HTMLButtonElement

  firstTrigger.click()
  await nextTick()
  await nextTick()

  const viewport = page.container.querySelector('[data-slot="navigation-menu-viewport"]') as HTMLElement

  secondTrigger.click()
  await nextTick()
  await nextTick()

  const panels = Array.from(viewport.querySelectorAll('[data-slot="navigation-menu-content"]')) as HTMLElement[]
  const openPanel = panels.find(panel => panel.dataset.state === 'open') as HTMLElement
  const closedPanel = panels.find(panel => panel.dataset.state === 'closed') as HTMLElement

  expect(fixture.activeItem.value).toBe('second')
  expect(panels).toHaveLength(2)
  expect(getComputedStyle(viewport).overflow).toBe('hidden')
  expect(getComputedStyle(openPanel).position).toBe('static')
  expect(getComputedStyle(closedPanel).display).toBe('none')
})

it('未受控时保留 Reka 的 defaultValue', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(NavigationMenu, { defaultValue: 'default-open', viewport: false }, {
      default: () => h(NavigationMenuList, {}, {
        default: () => h(NavigationMenuItem, { value: 'default-open' }, {
          default: () => [
            h(NavigationMenuTrigger, { 'data-testid': 'default-trigger' }, { default: () => '默认打开' }),
            h(NavigationMenuContent, { class: 'w-56 p-2' }, { default: () => '默认内容' })
          ]
        })
      })
    })
  })

  const page = render(Fixture)
  await nextTick()
  await nextTick()

  const trigger = page.container.querySelector('[data-testid="default-trigger"]') as HTMLButtonElement
  const content = page.container.querySelector('[data-slot="navigation-menu-content"]') as HTMLElement

  expect(trigger.dataset.state).toBe('open')
  expect(content.dataset.state).toBe('open')
})

it('触发器支持 asChild，并使用点击、键盘和 Escape 保持 Reka 交互契约', async () => {
  const activeItem = ref('')
  const Fixture = defineComponent({
    setup: () => () => h(NavigationMenu, {
      'modelValue': activeItem.value,
      'onUpdate:modelValue': (value: string) => {
        activeItem.value = value
      }
    }, {
      default: () => h(NavigationMenuList, {}, {
        default: () => h(NavigationMenuItem, { value: 'docs' }, {
          default: () => [
            h(NavigationMenuTrigger, { asChild: true }, {
              default: () => h('button', { 'class': 'custom-button', 'data-testid': 'as-child-trigger' }, '文档')
            }),
            h(NavigationMenuContent, {}, {
              default: () => h('button', { 'data-testid': 'docs-content-button' }, '开始阅读')
            })
          ]
        })
      })
    })
  })

  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="as-child-trigger"]') as HTMLButtonElement
  expect(trigger.classList).toContain('navigation-menu__trigger')
  expect(trigger.classList).toContain('custom-button')

  trigger.click()
  await nextTick()
  await nextTick()
  expect(activeItem.value).toBe('docs')

  const content = page.container.querySelector('[data-slot="navigation-menu-content"]') as HTMLElement
  trigger.focus()
  trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }))
  await nextTick()
  expect(activeItem.value).toBe('docs')

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  expect(activeItem.value).toBe('')
  expect(document.activeElement).toBe(trigger)
})

it('禁用触发器不可打开，active Link 与深色主题消费对应的 Reka 和 Nova 状态', async () => {
  const fixture = createFixture()
  const page = render(fixture.Fixture)
  const disabled = page.container.querySelector('[data-testid="disabled-trigger"]') as HTMLButtonElement
  const activeLink = page.container.querySelector('[data-testid="overview-link"]') as HTMLElement

  disabled.click()
  await nextTick()
  expect(fixture.activeItem.value).toBe('')
  expect(disabled.hasAttribute('data-disabled')).toBe(true)
  expect(getComputedStyle(disabled).opacity).toBe('0.5')
  expect(activeLink.hasAttribute('data-active')).toBe(true)

  const lightBackground = getComputedStyle(activeLink).getPropertyValue('--accent').trim()
  document.documentElement.dataset.theme = 'dark'
  await nextTick()
  expect(getComputedStyle(activeLink).getPropertyValue('--accent').trim()).not.toBe(lightBackground)
})

it('可关闭自动 Viewport 并显式组合 Viewport，同时保留 Sub 的受控状态与方向', async () => {
  const activeItem = ref('')
  const subItem = ref('')
  const Fixture = defineComponent({
    setup: () => () => h(NavigationMenu, {
      'modelValue': activeItem.value,
      'viewport': false,
      'onUpdate:modelValue': (value: string) => {
        activeItem.value = value
      }
    }, {
      default: () => [
        h(NavigationMenuList, {}, {
          default: () => h(NavigationMenuItem, { value: 'manual' }, {
            default: () => [
              h(NavigationMenuTrigger, { 'data-testid': 'manual-trigger' }, { default: () => '手动' }),
              h(NavigationMenuContent, {}, {
                default: () => h(NavigationMenuSub, {
                  'modelValue': subItem.value,
                  'orientation': 'vertical',
                  'onUpdate:modelValue': (value: string) => {
                    subItem.value = value
                  }
                }, {
                  default: () => h(NavigationMenuList, {}, {
                    default: () => h(NavigationMenuItem, {}, {
                      default: () => h(NavigationMenuLink, { 'href': '#sub', 'data-testid': 'sub-link' }, { default: () => '子项' })
                    })
                  })
                })
              })
            ]
          })
        }),
        h(NavigationMenuViewport, { 'data-testid': 'manual-viewport' })
      ]
    })
  })

  const page = render(Fixture)
  const root = page.container.querySelector('[data-slot="navigation-menu"]') as HTMLElement
  expect(root.dataset.viewport).toBe('false')
  expect(page.container.querySelector('[data-slot="navigation-menu-viewport"]')).toBeNull()

  const trigger = page.container.querySelector('[data-testid="manual-trigger"]') as HTMLButtonElement
  trigger.click()
  await nextTick()
  await nextTick()

  const viewport = page.container.querySelector('[data-testid="manual-viewport"]') as HTMLElement
  const content = viewport.querySelector('[data-slot="navigation-menu-content"]') as HTMLElement
  const sub = viewport.querySelector('[data-slot="navigation-menu-sub"]') as HTMLElement
  expect(content).not.toBeNull()
  expect(content.dataset.viewport).toBe('manual')
  expect(getComputedStyle(content).boxShadow).toBe('none')
  expect(getComputedStyle(viewport).boxShadow).not.toBe('none')
  expect(sub.getAttribute('data-orientation')).toBe('vertical')
})
