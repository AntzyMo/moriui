import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Button from '../src/components/button/Button.vue'
import Dialog from '../src/components/dialog/Dialog.vue'
import DialogClose from '../src/components/dialog/DialogClose.vue'
import DialogTitle from '../src/components/dialog/DialogTitle.vue'
import DialogFooter from '../src/components/dialog/DialogFooter.vue'
import DialogHeader from '../src/components/dialog/DialogHeader.vue'
import DialogContent from '../src/components/dialog/DialogContent.vue'
import DialogTrigger from '../src/components/dialog/DialogTrigger.vue'
import DialogDescription from '../src/components/dialog/DialogDescription.vue'

import './dialog.style.css'

afterEach(() => {
  cleanup()
  document.body.style.cssText = ''
  delete document.documentElement.dataset.theme
})

function createFixture(options: {
  controlled?: boolean
  showCloseButton?: boolean
} = {}) {
  const open = ref(false)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })

  const Fixture = defineComponent({
    setup: () => () => h(Dialog, options.controlled
      ? { 'open': open.value, 'onUpdate:open': onUpdateOpen }
      : {}, {
      default: () => [
        h(DialogTrigger, { class: 'custom-trigger' }, { default: () => '打开弹窗' }),
        h(DialogContent, {
          class: 'custom-content',
          showCloseButton: options.showCloseButton
        }, {
          default: () => [
            h(DialogHeader, { class: 'custom-header' }, {
              default: () => [
                h(DialogTitle, {}, { default: () => '编辑项目' }),
                h(DialogDescription, {}, { default: () => '更新项目的基本信息。' })
              ]
            }),
            h(DialogFooter, { class: 'custom-footer' }, {
              default: () => [
                h(DialogClose, { asChild: true }, {
                  default: () => h(Button, { variant: 'outline' }, { default: () => '取消' })
                })
              ]
            })
          ]
        })
      ]
    })
  })

  return { Fixture, onUpdateOpen, open }
}

async function openDialog(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-slot="dialog-trigger"]') as HTMLButtonElement
  trigger.click()
  await nextTick()
  await nextTick()
  return { page, trigger }
}

it('渲染 Nova 单一宽度、稳定槽位和调用方类名', async () => {
  const { Fixture } = createFixture()
  const { trigger } = await openDialog(Fixture)
  const content = document.body.querySelector('[data-slot="dialog-content"][data-state="open"]') as HTMLElement

  expect(trigger.classList).toContain('dialog__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(content.classList).toContain('dialog__content')
  expect(content.classList).toContain('custom-content')
  expect(content.hasAttribute('data-size')).toBe(false)
  expect(document.body.querySelector('[data-slot="dialog-overlay"]')?.classList).toContain('dialog__overlay')
  expect(content.querySelector('[data-slot="dialog-header"]')?.classList).toContain('custom-header')
  expect(content.querySelector('[data-slot="dialog-footer"]')?.classList).toContain('custom-footer')
  expect(content.querySelector('[data-slot="dialog-close"]')?.classList).toContain('dialog__close')
  expect(content.querySelector('.dialog__close-button')).not.toBeNull()
  expect(getComputedStyle(content.querySelector('[data-slot="dialog-footer"] [data-slot="dialog-close"]')!).position).not.toBe('absolute')
  expect(getComputedStyle(content).padding).toBe('16px')
  expect(getComputedStyle(content).fontSize).toBe('14px')
  expect(getComputedStyle(content.querySelector('.dialog__close-button')!).top).toBe('8px')
})

it('通过受控 open 模型同步开闭状态', async () => {
  const { Fixture, onUpdateOpen, open } = createFixture({ controlled: true })
  await openDialog(Fixture)

  expect(onUpdateOpen).toHaveBeenCalledWith(true)
  expect(open.value).toBe(true)

  const close = document.body.querySelector('[data-slot="dialog-content"] [data-slot="dialog-close"]') as HTMLButtonElement
  close.click()
  await nextTick()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(false)
  expect(open.value).toBe(false)
})

it('提供 dialog 语义、标题描述关联与默认关闭按钮', async () => {
  const { Fixture } = createFixture()
  await openDialog(Fixture)
  const content = document.body.querySelector('[data-slot="dialog-content"][data-state="open"]') as HTMLElement
  const title = content.querySelector('[data-slot="dialog-title"]') as HTMLElement
  const description = content.querySelector('[data-slot="dialog-description"]') as HTMLElement
  const close = Array.from(content.querySelectorAll('[data-slot="dialog-close"]')).find(element =>
    element.classList.contains('button--icon-sm')
  ) as HTMLButtonElement

  expect(content.getAttribute('role')).toBe('dialog')
  expect(content.getAttribute('aria-labelledby')).toBe(title.id)
  expect(content.getAttribute('aria-describedby')).toBe(description.id)
  expect(close.textContent).toContain('关闭')
  expect(document.activeElement).toBe(content.querySelector('[data-slot="dialog-close"]'))
})

it('支持隐藏默认关闭按钮、Esc、遮罩点击与焦点归还', async () => {
  const { Fixture } = createFixture({ showCloseButton: false })
  const { trigger } = await openDialog(Fixture)
  const content = document.body.querySelector('[data-slot="dialog-content"][data-state="open"]') as HTMLElement

  expect(content.querySelector('[data-slot="dialog-close"]')).not.toBeNull()
  expect(content.querySelector('[data-slot="dialog-close"]')?.textContent).toContain('取消')

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 150))
  expect(content.dataset.state).toBe('closed')
  expect(document.activeElement).toBe(trigger)

  trigger.click()
  await nextTick()
  const overlay = document.body.querySelector('[data-slot="dialog-overlay"][data-state="open"]') as HTMLElement
  overlay.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 150))
  expect(content.dataset.state).toBe('closed')
})

it('消费主题与短动效样式契约', async () => {
  const { Fixture } = createFixture()
  await openDialog(Fixture)
  const content = document.body.querySelector('[data-slot="dialog-content"][data-state="open"]') as HTMLElement
  const overlay = document.body.querySelector('[data-slot="dialog-overlay"][data-state="open"]') as HTMLElement

  expect(getComputedStyle(content).animationDuration).toBe('0.1s')
  expect(getComputedStyle(overlay).animationDuration).toBe('0.1s')
  expect(getComputedStyle(content).getPropertyValue('--dialog-bg').trim()).toBe('oklch(1 0 0)')
  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--dialog-bg').trim()).toBe('oklch(0.205 0 0)')
})
