import { afterEach, expect, it, vi } from 'vite-plus/test'

import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Button from '../src/components/button/Button.vue'
import Drawer from '../src/components/drawer/Drawer.vue'
import DrawerClose from '../src/components/drawer/DrawerClose.vue'
import DrawerTitle from '../src/components/drawer/DrawerTitle.vue'
import DrawerFooter from '../src/components/drawer/DrawerFooter.vue'
import DrawerHeader from '../src/components/drawer/DrawerHeader.vue'
import DrawerContent from '../src/components/drawer/DrawerContent.vue'
import DrawerTrigger from '../src/components/drawer/DrawerTrigger.vue'
import DrawerDescription from '../src/components/drawer/DrawerDescription.vue'

import './drawer.style.css'

afterEach(() => {
  cleanup()
  document.body.style.cssText = ''
  delete document.documentElement.dataset.theme
})

type SwipeDirection = 'down' | 'up' | 'left' | 'right'

function createFixture(
  options: {
    controlled?: boolean
    showHandle?: boolean
    swipeDirection?: SwipeDirection
    snapPoints?: number[]
  } = {}
) {
  const open = ref(false)
  const snapPoint = ref<number | null>(options.snapPoints?.[0] ?? null)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })
  const onUpdateSnapPoint = vi.fn((value: number | null) => {
    snapPoint.value = value
  })

  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Drawer,
        {
          ...(options.controlled ? { 'open': open.value, 'onUpdate:open': onUpdateOpen } : {}),
          'swipeDirection': options.swipeDirection,
          'snapPoints': options.snapPoints,
          'snapPoint': options.snapPoints ? snapPoint.value : undefined,
          'onUpdate:snapPoint': onUpdateSnapPoint
        },
        {
          default: () => [
            h(DrawerTrigger, { class: 'custom-trigger' }, { default: () => '打开抽屉' }),
            h(
              DrawerContent,
              { class: 'custom-content', showHandle: options.showHandle },
              {
                default: () => [
                  h(
                    DrawerHeader,
                    { class: 'custom-header' },
                    {
                      default: () => [
                        h(DrawerTitle, {}, { default: () => '编辑项目' }),
                        h(DrawerDescription, {}, { default: () => '更新项目的基本信息。' })
                      ]
                    }
                  ),
                  h(
                    DrawerFooter,
                    { class: 'custom-footer' },
                    {
                      default: () => [
                        h(
                          DrawerClose,
                          { asChild: true },
                          {
                            default: () =>
                              h(Button, { variant: 'outline' }, { default: () => '取消' })
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

  return { Fixture, onUpdateOpen, onUpdateSnapPoint, open, snapPoint }
}

async function openDrawer(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-slot="drawer-trigger"]') as HTMLButtonElement
  trigger.click()
  await nextTick()
  await nextTick()
  return { page, trigger }
}

it.each<SwipeDirection>(['down', 'up', 'left', 'right'])(
  '渲染 %s 方向、稳定槽位和调用方类名',
  async swipeDirection => {
    const { Fixture } = createFixture({ showHandle: true, swipeDirection })
    const { trigger } = await openDrawer(Fixture)
    const content = document.body.querySelector(
      '[data-slot="drawer-content"][data-state="open"]'
    ) as HTMLElement

    expect(trigger.classList).toContain('drawer__trigger')
    expect(trigger.classList).toContain('custom-trigger')
    expect(content.classList).toContain('drawer__content')
    expect(content.classList).toContain('custom-content')
    expect(content.dataset.swipeDirection).toBe(swipeDirection)
    expect(document.body.querySelector('[data-slot="drawer-overlay"]')?.classList).toContain(
      'drawer__overlay'
    )
    expect(content.querySelector('[data-slot="drawer-handle"]')?.classList).toContain(
      'drawer__handle'
    )
    expect(content.querySelector('[data-slot="drawer-header"]')?.classList).toContain(
      'custom-header'
    )
    expect(content.querySelector('[data-slot="drawer-footer"]')?.classList).toContain(
      'custom-footer'
    )
  }
)

it('默认不渲染把手，并支持显式关闭把手', async () => {
  const { Fixture } = createFixture()
  await openDrawer(Fixture)
  expect(document.body.querySelector('[data-slot="drawer-handle"]')).toBeNull()
})

it('右侧 Drawer 使用 Nova 浮动面板与固定操作区', async () => {
  const { Fixture } = createFixture({ swipeDirection: 'right' })
  await openDrawer(Fixture)

  const content = document.body.querySelector(
    '[data-slot="drawer-content"][data-state="open"]'
  ) as HTMLElement
  const footer = content.querySelector('[data-slot="drawer-footer"]') as HTMLElement
  const overlay = document.body.querySelector(
    '[data-slot="drawer-overlay"][data-state="open"]'
  ) as HTMLElement
  const contentStyles = getComputedStyle(content)
  const footerStyles = getComputedStyle(footer)

  expect(contentStyles.top).toBe('8px')
  expect(contentStyles.right).toBe('8px')
  expect(contentStyles.bottom).toBe('8px')
  expect(contentStyles.borderTopWidth).toBe('1px')
  expect(contentStyles.borderRadius).not.toBe('0px')
  expect(contentStyles.boxShadow).not.toBe('none')
  expect(footerStyles.position).toBe('sticky')
  expect(footerStyles.bottom).toBe('0px')
  expect(getComputedStyle(overlay).backdropFilter).not.toBe('none')
})

it('通过受控 open 模型同步开闭状态', async () => {
  const { Fixture, onUpdateOpen, open } = createFixture({ controlled: true })
  await openDrawer(Fixture)

  expect(onUpdateOpen.mock.calls[0]?.[0]).toBe(true)
  expect(open.value).toBe(true)

  const close = document.body.querySelector(
    '[data-slot="drawer-content"] [data-slot="drawer-close"]'
  ) as HTMLButtonElement
  close.click()
  await nextTick()
  expect(onUpdateOpen.mock.calls.at(-1)?.[0]).toBe(false)
  expect(open.value).toBe(false)
})

it('提供 dialog 语义、标题描述关联、Teleport 与焦点归还', async () => {
  const { Fixture } = createFixture()
  const { trigger } = await openDrawer(Fixture)
  const content = document.body.querySelector(
    '[data-slot="drawer-content"][data-state="open"]'
  ) as HTMLElement
  const title = content.querySelector('[data-slot="drawer-title"]') as HTMLElement
  const description = content.querySelector('[data-slot="drawer-description"]') as HTMLElement

  expect(content.getAttribute('role')).toBe('dialog')
  expect(content.getAttribute('aria-labelledby')).toBe(title.id)
  expect(content.getAttribute('aria-describedby')).toBe(description.id)
  expect(content.parentElement).toBe(document.body)

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 500))
  expect(content.dataset.state).toBe('closed')
  expect(document.activeElement).toBe(trigger)
})

it('支持拖拽关闭', async () => {
  const { Fixture, onUpdateOpen } = createFixture({ controlled: true })
  const { trigger } = await openDrawer(Fixture)
  const content = document.body.querySelector(
    '[data-slot="drawer-content"][data-state="open"]'
  ) as HTMLElement

  content.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      button: 0,
      buttons: 1,
      clientX: 20,
      clientY: 20,
      pointerId: 1,
      pointerType: 'mouse'
    })
  )
  content.dispatchEvent(
    new PointerEvent('pointermove', {
      bubbles: true,
      buttons: 1,
      clientX: 20,
      clientY: 120,
      pointerId: 1,
      pointerType: 'mouse'
    })
  )
  await nextTick()
  expect(content.hasAttribute('data-swiping')).toBe(true)

  content.dispatchEvent(
    new PointerEvent('pointerup', {
      bubbles: true,
      button: 0,
      clientX: 20,
      clientY: 120,
      pointerId: 1,
      pointerType: 'mouse'
    })
  )
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 500))
  expect(onUpdateOpen.mock.calls.at(-1)?.[0]).toBe(false)
  expect(content.hasAttribute('data-swiping')).toBe(false)
  expect(trigger).toBe(document.activeElement)
})

it('支持遮罩点击关闭和受控吸附点', async () => {
  const { Fixture, snapPoint, onUpdateSnapPoint } = createFixture({
    controlled: true,
    snapPoints: [0.4, 1]
  })
  const { trigger } = await openDrawer(Fixture)
  const content = document.body.querySelector(
    '[data-slot="drawer-content"][data-state="open"]'
  ) as HTMLElement

  expect(snapPoint.value).toBe(0.4)
  expect(onUpdateSnapPoint).not.toHaveBeenCalled()

  await new Promise(resolve => setTimeout(resolve, 0))
  const overlay = document.body.querySelector(
    '[data-slot="drawer-overlay"][data-state="open"]'
  ) as HTMLElement
  overlay.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      button: 0,
      pointerType: 'mouse'
    })
  )
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 500))
  expect(content.dataset.state).toBe('closed')
  expect(document.activeElement).toBe(trigger)
})

it('消费主题与短动效样式契约', async () => {
  const { Fixture } = createFixture()
  await openDrawer(Fixture)
  const content = document.body.querySelector(
    '[data-slot="drawer-content"][data-state="open"]'
  ) as HTMLElement
  const overlay = document.body.querySelector(
    '[data-slot="drawer-overlay"][data-state="open"]'
  ) as HTMLElement

  expect(getComputedStyle(content).animationDuration).toBe('0.45s')
  expect(getComputedStyle(overlay).animationDuration).toBe('0.45s')
  expect(getComputedStyle(content).getPropertyValue('--drawer-bg').trim()).toBe('oklch(1 0 0)')
  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--drawer-bg').trim()).toBe('oklch(0.205 0 0)')
})
