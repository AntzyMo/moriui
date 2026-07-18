import { afterEach, expect, it, vi } from 'vite-plus/test'
import type { SheetSide } from '../src/components/sheet/variants'

import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Sheet from '../src/components/sheet/Sheet.vue'
import Button from '../src/components/button/Button.vue'
import SheetClose from '../src/components/sheet/SheetClose.vue'
import SheetTitle from '../src/components/sheet/SheetTitle.vue'
import SheetFooter from '../src/components/sheet/SheetFooter.vue'
import SheetHeader from '../src/components/sheet/SheetHeader.vue'
import SheetContent from '../src/components/sheet/SheetContent.vue'
import SheetTrigger from '../src/components/sheet/SheetTrigger.vue'
import SheetDescription from '../src/components/sheet/SheetDescription.vue'

import './sheet.style.css'

afterEach(() => {
  cleanup()
  document.body.style.cssText = ''
  delete document.documentElement.dataset.theme
})

function createFixture(
  options: {
    controlled?: boolean
    showCloseButton?: boolean
    side?: SheetSide
  } = {}
) {
  const open = ref(false)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })

  const Fixture = defineComponent({
    setup: () => () =>
      h(Sheet, options.controlled ? { 'open': open.value, 'onUpdate:open': onUpdateOpen } : {}, {
        default: () => [
          h(SheetTrigger, { class: 'custom-trigger' }, { default: () => '打开面板' }),
          h(
            SheetContent,
            {
              class: 'custom-content',
              side: options.side,
              showCloseButton: options.showCloseButton
            },
            {
              default: () => [
                h(
                  SheetHeader,
                  { class: 'custom-header' },
                  {
                    default: () => [
                      h(SheetTitle, {}, { default: () => '编辑项目' }),
                      h(SheetDescription, {}, { default: () => '更新项目的基本信息。' })
                    ]
                  }
                ),
                h(
                  SheetFooter,
                  { class: 'custom-footer' },
                  {
                    default: () => [
                      h(
                        SheetClose,
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
      })
  })

  return { Fixture, onUpdateOpen, open }
}

async function openSheet(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-slot="sheet-trigger"]') as HTMLButtonElement
  trigger.click()
  await nextTick()
  await nextTick()
  return { page, trigger }
}

it.each<SheetSide>(['top', 'right', 'bottom', 'left'])(
  '渲染 %s 方向、稳定槽位和调用方类名',
  async side => {
    const { Fixture } = createFixture({ side })
    const { trigger } = await openSheet(Fixture)
    const content = document.body.querySelector(
      '[data-slot="sheet-content"][data-state="open"]'
    ) as HTMLElement

    expect(trigger.classList).toContain('sheet__trigger')
    expect(trigger.classList).toContain('custom-trigger')
    expect(content.classList).toContain('sheet__content')
    expect(content.classList).toContain('custom-content')
    expect(content.dataset.side).toBe(side)
    expect(document.body.querySelector('[data-slot="sheet-overlay"]')?.classList).toContain(
      'sheet__overlay'
    )
    expect(content.querySelector('[data-slot="sheet-header"]')?.classList).toContain(
      'custom-header'
    )
    expect(content.querySelector('[data-slot="sheet-footer"]')?.classList).toContain(
      'custom-footer'
    )
    expect(content.querySelector('[data-slot="sheet-close"]')?.classList).toContain('sheet__close')
    expect(content.querySelector('.sheet__close-button')).not.toBeNull()
  }
)

it('默认从右侧打开，并使用 Base Nova 的贴边面板尺寸', async () => {
  const { Fixture } = createFixture()
  await openSheet(Fixture)
  const content = document.body.querySelector(
    '[data-slot="sheet-content"][data-state="open"]'
  ) as HTMLElement
  const header = content.querySelector('[data-slot="sheet-header"]') as HTMLElement
  const footer = content.querySelector('[data-slot="sheet-footer"]') as HTMLElement
  const close = content.querySelector('.sheet__close-button') as HTMLElement
  const styles = getComputedStyle(content)

  expect(content.dataset.side).toBe('right')
  expect(styles.right).toBe('0px')
  expect(styles.width).not.toBe('0px')
  expect(['none', '384px']).toContain(styles.maxWidth)
  expect(styles.borderLeftWidth).toBe('1px')
  expect(styles.borderRadius).toBe('0px')
  expect(styles.padding).toBe('0px')
  expect(getComputedStyle(header).padding).toBe('16px')
  expect(getComputedStyle(footer).padding).toBe('16px')
  expect(getComputedStyle(close).top).toBe('12px')
  expect(getComputedStyle(footer).position).toBe('static')
})

it.each<
  [
    SheetSide,
    'top' | 'right' | 'bottom' | 'left',
    'borderTopWidth' | 'borderRightWidth' | 'borderBottomWidth' | 'borderLeftWidth'
  ]
>([
  ['top', 'top', 'borderBottomWidth'],
  ['right', 'right', 'borderLeftWidth'],
  ['bottom', 'bottom', 'borderTopWidth'],
  ['left', 'left', 'borderRightWidth']
])('将 %s 面板锚定在正确视口边缘', async (side, edge, border) => {
  const { Fixture } = createFixture({ side })
  await openSheet(Fixture)
  const content = document.body.querySelector(
    '[data-slot="sheet-content"][data-state="open"]'
  ) as HTMLElement
  const styles = getComputedStyle(content)

  expect(styles[edge]).toBe('0px')
  expect(styles[border]).toBe('1px')
  expect(styles.animationDuration).toBe('0.2s')
})

it('通过受控 open 模型同步开闭状态', async () => {
  const { Fixture, onUpdateOpen, open } = createFixture({ controlled: true })
  await openSheet(Fixture)

  expect(onUpdateOpen).toHaveBeenCalledWith(true)
  expect(open.value).toBe(true)

  const close = document.body.querySelector(
    '[data-slot="sheet-content"] [data-slot="sheet-close"]'
  ) as HTMLButtonElement
  close.click()
  await nextTick()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(false)
  expect(open.value).toBe(false)
})

it('提供 dialog 语义、标题描述关联、Teleport 与默认关闭按钮', async () => {
  const { Fixture } = createFixture()
  await openSheet(Fixture)
  const content = document.body.querySelector(
    '[data-slot="sheet-content"][data-state="open"]'
  ) as HTMLElement
  const title = content.querySelector('[data-slot="sheet-title"]') as HTMLElement
  const description = content.querySelector('[data-slot="sheet-description"]') as HTMLElement
  const close = Array.from(content.querySelectorAll('[data-slot="sheet-close"]')).find(element =>
    element.classList.contains('button--icon-sm')
  ) as HTMLButtonElement

  expect(content.getAttribute('role')).toBe('dialog')
  expect(content.getAttribute('aria-labelledby')).toBe(title.id)
  expect(content.getAttribute('aria-describedby')).toBe(description.id)
  expect(content.parentElement).toBe(document.body)
  expect(close.querySelector('.sr-only')).toBeNull()
  expect(document.activeElement).toBe(content.querySelector('[data-slot="sheet-close"]'))
})

it('支持隐藏默认关闭按钮、Esc、遮罩点击与焦点归还', async () => {
  const { Fixture } = createFixture({ showCloseButton: false })
  const { trigger } = await openSheet(Fixture)
  const content = document.body.querySelector(
    '[data-slot="sheet-content"][data-state="open"]'
  ) as HTMLElement

  expect(content.querySelector('.sheet__close-button')).toBeNull()
  expect(content.querySelector('[data-slot="sheet-close"]')?.textContent).toContain('取消')

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 250))
  expect(content.dataset.state).toBe('closed')
  expect(document.activeElement).toBe(trigger)

  trigger.click()
  await nextTick()
  const overlay = document.body.querySelector(
    '[data-slot="sheet-overlay"][data-state="open"]'
  ) as HTMLElement
  overlay.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 250))
  expect(content.dataset.state).toBe('closed')
})

it('消费主题、短动效与减少动效契约', async () => {
  const { Fixture } = createFixture()
  await openSheet(Fixture)
  const content = document.body.querySelector(
    '[data-slot="sheet-content"][data-state="open"]'
  ) as HTMLElement
  const overlay = document.body.querySelector(
    '[data-slot="sheet-overlay"][data-state="open"]'
  ) as HTMLElement
  const hasReducedMotionRule = Array.from(document.styleSheets).some(sheet =>
    Array.from(sheet.cssRules).some(
      rule =>
        rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion')
    )
  )

  expect(getComputedStyle(content).animationDuration).toBe('0.2s')
  expect(getComputedStyle(overlay).animationDuration).toBe('0.15s')
  expect(getComputedStyle(content).getPropertyValue('--sheet-bg').trim()).toBe('oklch(1 0 0)')
  expect(hasReducedMotionRule).toBe(true)
  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--sheet-bg').trim()).toBe('oklch(0.205 0 0)')
})
