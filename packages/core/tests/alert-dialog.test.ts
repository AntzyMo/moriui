import { afterEach, expect, it, vi } from 'vite-plus/test'

import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Button from '../src/components/button/Button.vue'
import AlertDialog from '../src/components/alert-dialog/AlertDialog.vue'
import AlertDialogMedia from '../src/components/alert-dialog/AlertDialogMedia.vue'
import AlertDialogTitle from '../src/components/alert-dialog/AlertDialogTitle.vue'
import AlertDialogAction from '../src/components/alert-dialog/AlertDialogAction.vue'
import AlertDialogCancel from '../src/components/alert-dialog/AlertDialogCancel.vue'
import AlertDialogFooter from '../src/components/alert-dialog/AlertDialogFooter.vue'
import AlertDialogHeader from '../src/components/alert-dialog/AlertDialogHeader.vue'
import AlertDialogContent from '../src/components/alert-dialog/AlertDialogContent.vue'
import AlertDialogTrigger from '../src/components/alert-dialog/AlertDialogTrigger.vue'
import AlertDialogDescription from '../src/components/alert-dialog/AlertDialogDescription.vue'

import './style.css'

afterEach(() => {
  cleanup()
  document.body.style.cssText = ''
  delete document.documentElement.dataset.theme
})

function createFixture(options: { controlled?: boolean, size?: 'default' | 'sm' } = {}) {
  const open = ref(false)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })

  const Fixture = defineComponent({
    setup: () => () =>
      h(
        AlertDialog,
        options.controlled ? { 'open': open.value, 'onUpdate:open': onUpdateOpen } : {},
        {
          default: () => [
            h(AlertDialogTrigger, { class: 'custom-trigger' }, { default: () => '打开确认框' }),
            h(
              AlertDialogContent,
              { class: 'custom-content', size: options.size },
              {
                default: () => [
                  h(
                    AlertDialogHeader,
                    {},
                    {
                      default: () => [
                        h(AlertDialogMedia, {}, { default: () => h('span', '！') }),
                        h(AlertDialogTitle, {}, { default: () => '删除项目？' }),
                        h(AlertDialogDescription, {}, { default: () => '该操作无法撤销。' })
                      ]
                    }
                  ),
                  h(
                    AlertDialogFooter,
                    {},
                    {
                      default: () => [
                        h(
                          AlertDialogCancel,
                          { asChild: true },
                          {
                            default: () =>
                              h(Button, { variant: 'outline' }, { default: () => '取消' })
                          }
                        ),
                        h(
                          AlertDialogAction,
                          { asChild: true },
                          {
                            default: () =>
                              h(Button, { variant: 'destructive' }, { default: () => '删除' })
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

  return { Fixture, onUpdateOpen, open }
}

async function openDialog(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector(
    '[data-slot="alert-dialog-trigger"]'
  ) as HTMLButtonElement
  trigger.click()
  await nextTick()
  await nextTick()
  return { page, trigger }
}

it('渲染稳定槽位、Nova 类名、尺寸和按钮变体', async () => {
  const { Fixture } = createFixture({ size: 'sm' })
  const { trigger } = await openDialog(Fixture)
  const content = document.body.querySelector(
    '[data-slot="alert-dialog-content"][data-state="open"]'
  ) as HTMLElement

  expect(trigger.classList).toContain('alert-dialog__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(content.classList).toContain('alert-dialog__content')
  expect(content.classList).toContain('alert-dialog__content--sm')
  expect(content.classList).toContain('custom-content')
  expect(content.className.endsWith('custom-content')).toBe(true)
  expect(content.dataset.size).toBe('sm')
  expect(document.body.querySelector('[data-slot="alert-dialog-overlay"]')?.classList).toContain(
    'alert-dialog__overlay'
  )
  expect(document.body.querySelector('[data-slot="alert-dialog-header"]')?.classList).toContain(
    'alert-dialog__header'
  )
  expect(document.body.querySelector('[data-slot="alert-dialog-media"]')?.classList).toContain(
    'alert-dialog__media'
  )
  expect(document.body.querySelector('[data-slot="alert-dialog-footer"]')?.classList).toContain(
    'alert-dialog__footer'
  )
  expect(document.body.querySelector('[data-slot="alert-dialog-action"]')?.classList).toContain(
    'button--destructive'
  )
  expect(document.body.querySelector('[data-slot="alert-dialog-cancel"]')?.classList).toContain(
    'button--outline'
  )
})

it('通过受控 open 模型同步开闭状态，并由操作按钮关闭', async () => {
  const { Fixture, onUpdateOpen, open } = createFixture({ controlled: true })
  await openDialog(Fixture)

  expect(onUpdateOpen).toHaveBeenCalledWith(true)
  expect(open.value).toBe(true)

  const action = document.body.querySelector(
    '[data-slot="alert-dialog-content"][data-state="open"] [data-slot="alert-dialog-action"]'
  ) as HTMLButtonElement
  action.click()
  await nextTick()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(false)
  expect(open.value).toBe(false)
})

it('提供 alertdialog 语义、标题描述关联与取消按钮初始焦点', async () => {
  const { Fixture } = createFixture()
  await openDialog(Fixture)
  const content = document.body.querySelector(
    '[data-slot="alert-dialog-content"][data-state="open"]'
  ) as HTMLElement
  const title = content.querySelector('[data-slot="alert-dialog-title"]') as HTMLElement
  const description = content.querySelector(
    '[data-slot="alert-dialog-description"]'
  ) as HTMLElement
  const cancel = content.querySelector('[data-slot="alert-dialog-cancel"]') as HTMLButtonElement

  expect(content.getAttribute('role')).toBe('alertdialog')
  expect(content.getAttribute('aria-labelledby')).toBe(title.id)
  expect(content.getAttribute('aria-describedby')).toBe(description.id)
  expect(document.activeElement).toBe(cancel)
})

it('escape 关闭后焦点返回触发器，外部指针交互不会关闭', async () => {
  const { Fixture } = createFixture()
  const { trigger } = await openDialog(Fixture)
  const content = document.body.querySelector(
    '[data-slot="alert-dialog-content"][data-state="open"]'
  ) as HTMLElement

  document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
  await nextTick()
  expect(content.dataset.state).toBe('open')

  content.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 150))
  expect(content.dataset.state).toBe('closed')
  expect(document.activeElement).toBe(trigger)
})

it('消费主题与短动效样式契约', async () => {
  const { Fixture } = createFixture()
  await openDialog(Fixture)
  const content = document.body.querySelector(
    '[data-slot="alert-dialog-content"][data-state="open"]'
  ) as HTMLElement
  const overlay = document.body.querySelector(
    '[data-slot="alert-dialog-overlay"][data-state="open"]'
  ) as HTMLElement

  expect(getComputedStyle(content).animationDuration).toBe('0.1s')
  expect(getComputedStyle(overlay).animationDuration).toBe('0.1s')
  expect(getComputedStyle(content).getPropertyValue('--popover').trim()).toBe('oklch(1 0 0)')
  expect(getComputedStyle(content).getPropertyValue('--alert-dialog-bg').trim()).toBe(
    'oklch(1 0 0)'
  )
  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--popover').trim()).toBe('oklch(0.205 0 0)')
  expect(getComputedStyle(content).getPropertyValue('--alert-dialog-bg').trim()).toBe(
    'oklch(0.205 0 0)'
  )
  delete document.documentElement.dataset.theme
})
