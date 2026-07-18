import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Attachment from '../src/components/attachment/Attachment.vue'
import { attachmentVariants } from '../src/components/attachment/variants'
import AttachmentGroup from '../src/components/attachment/AttachmentGroup.vue'
import AttachmentMedia from '../src/components/attachment/AttachmentMedia.vue'
import AttachmentTitle from '../src/components/attachment/AttachmentTitle.vue'
import AttachmentAction from '../src/components/attachment/AttachmentAction.vue'
import AttachmentActions from '../src/components/attachment/AttachmentActions.vue'
import AttachmentContent from '../src/components/attachment/AttachmentContent.vue'
import AttachmentTrigger from '../src/components/attachment/AttachmentTrigger.vue'
import AttachmentDescription from '../src/components/attachment/AttachmentDescription.vue'

import './style.css'

it('默认渲染附件容器，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Attachment, {
    attrs: {
      'aria-label': '销售报表 PDF',
      'data-testid': 'sales-report',
      onClick
    },
    props: { class: 'custom-attachment' },
    slots: { default: '附件内容' }
  })
  const attachment = page.container.querySelector('[data-slot="attachment"]') as HTMLElement

  expect(attachment.dataset.state).toBe('done')
  expect(attachment.dataset.size).toBe('default')
  expect(attachment.dataset.orientation).toBe('horizontal')
  expect(attachment.classList).toContain('attachment')
  expect(attachment.classList).toContain('attachment--default-size')
  expect(attachment.classList).toContain('attachment--horizontal')
  expect(attachment.classList).toContain('custom-attachment')
  expect(attachment.getAttribute('aria-label')).toBe('销售报表 PDF')
  expect(attachment.dataset.testid).toBe('sales-report')

  attachment.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it.each([
  ['idle', 'xs', 'vertical'],
  ['uploading', 'sm', 'horizontal'],
  ['processing', 'default', 'vertical'],
  ['error', 'default', 'horizontal'],
  ['done', 'sm', 'vertical']
] as const)('应用 %s 状态、%s 尺寸和 %s 布局', (state, size, orientation) => {
  const page = render(Attachment, { props: { state, size, orientation } })
  const attachment = page.container.querySelector('[data-slot="attachment"]') as HTMLElement

  expect(attachment.dataset.state).toBe(state)
  expect(attachment.dataset.size).toBe(size)
  expect(attachment.dataset.orientation).toBe(orientation)
  expect(attachment.classList).toContain(
    `attachment--${size === 'default' ? 'default-size' : size}`
  )
  expect(attachment.classList).toContain(`attachment--${orientation}`)
})

it('渲染稳定的媒体、内容、文本、操作与分组槽位', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        AttachmentGroup,
        {},
        {
          default: () =>
            h(
              Attachment,
              {},
              {
                default: () => [
                  h(
                    AttachmentMedia,
                    { variant: 'image' },
                    { default: () => h('img', { alt: '工作区', src: '/workspace.png' }) }
                  ),
                  h(
                    AttachmentContent,
                    {},
                    {
                      default: () => [
                        h(AttachmentTitle, {}, { default: () => 'workspace.png' }),
                        h(AttachmentDescription, {}, { default: () => 'PNG · 1.2 MB' })
                      ]
                    }
                  ),
                  h(
                    AttachmentActions,
                    {},
                    {
                      default: () =>
                        h(
                          AttachmentAction,
                          { 'aria-label': '移除 workspace.png' },
                          { default: () => '×' }
                        )
                    }
                  )
                ]
              }
            )
        }
      )
  })
  const page = render(Fixture)
  const media = page.container.querySelector('[data-slot="attachment-media"]') as HTMLElement
  const action = page.container.querySelector(
    '[data-slot="attachment-action"]'
  ) as HTMLButtonElement

  expect(page.container.querySelector('[data-slot="attachment-group"]')?.classList).toContain(
    'attachment-group'
  )
  expect(media.dataset.variant).toBe('image')
  expect(media.classList).toContain('attachment__media--image')
  expect(page.container.querySelector('[data-slot="attachment-content"]')?.classList).toContain(
    'attachment__content'
  )
  expect(page.container.querySelector('[data-slot="attachment-title"]')?.classList).toContain(
    'attachment__title'
  )
  expect(page.container.querySelector('[data-slot="attachment-description"]')?.classList).toContain(
    'attachment__description'
  )
  expect(page.container.querySelector('[data-slot="attachment-actions"]')?.classList).toContain(
    'attachment__actions'
  )
  expect(action.classList).toContain('attachment__action')
  expect(action.classList).toContain('button--ghost')
  expect(action.classList).toContain('button--icon-xs')
  expect(action.getAttribute('aria-label')).toBe('移除 workspace.png')
})

it('附件操作透传 Button 的原生属性与事件', () => {
  const onClick = vi.fn()
  const page = render(AttachmentAction, {
    attrs: { onClick, type: 'submit' },
    slots: { default: '保存' }
  })
  const action = page.container.querySelector(
    '[data-slot="attachment-action"]'
  ) as HTMLButtonElement

  expect(action.type).toBe('submit')
  action.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('附件操作在原生按钮模式下保留禁用语义', () => {
  const page = render(AttachmentAction, { props: { disabled: true } })
  const action = page.container.querySelector(
    '[data-slot="attachment-action"]'
  ) as HTMLButtonElement

  expect(action.disabled).toBe(true)
  expect(getComputedStyle(action).opacity).toBe('1')
})

it('附件操作支持 Button 的多态渲染和禁用状态', () => {
  const page = render(AttachmentAction, {
    attrs: { href: '#download' },
    props: { as: 'a', disabled: true, variant: 'secondary', size: 'icon-sm' },
    slots: { default: '下载' }
  })
  const action = page.container.querySelector(
    '[data-slot="attachment-action"]'
  ) as HTMLAnchorElement

  expect(action.tagName).toBe('A')
  expect(action.getAttribute('href')).toBe('#download')
  expect(action.getAttribute('disabled')).toBeNull()
  expect(action.classList).toContain('button--secondary')
  expect(action.classList).toContain('button--icon-sm')
})

it('触发层默认渲染原生按钮，并可 asChild 组合链接', () => {
  const defaultPage = render(AttachmentTrigger, { attrs: { 'aria-label': '预览文件' } })
  const trigger = defaultPage.container.querySelector(
    '[data-slot="attachment-trigger"]'
  ) as HTMLButtonElement

  expect(trigger.tagName).toBe('BUTTON')
  expect(trigger.getAttribute('type')).toBeNull()
  expect(trigger.getAttribute('aria-label')).toBe('预览文件')

  const Fixture = defineComponent({
    setup: () => () =>
      h(
        AttachmentTrigger,
        { asChild: true },
        {
          default: () => h('a', { href: '#preview' }, '预览')
        }
      )
  })
  const asChildPage = render(Fixture)
  const link = asChildPage.container.querySelector('a') as HTMLAnchorElement

  expect(link.dataset.slot).toBe('attachment-trigger')
  expect(link.getAttribute('href')).toBe('#preview')
  expect(link.getAttribute('type')).toBeNull()
})

it('触发层位于操作区之下，根容器在焦点内显示焦点边框', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Attachment,
        {},
        {
          default: () => [
            h(
              AttachmentActions,
              {},
              { default: () => h(AttachmentAction, {}, { default: () => '×' }) }
            ),
            h(AttachmentTrigger, { 'aria-label': '打开附件' })
          ]
        }
      )
  })
  const page = render(Fixture)
  const attachment = page.container.querySelector('[data-slot="attachment"]') as HTMLElement
  const action = page.container.querySelector('[data-slot="attachment-action"]') as HTMLElement
  const trigger = page.container.querySelector(
    '[data-slot="attachment-trigger"]'
  ) as HTMLButtonElement

  expect(Number(getComputedStyle(action.parentElement as HTMLElement).zIndex)).toBeGreaterThan(
    Number(getComputedStyle(trigger).zIndex)
  )
  trigger.focus()
  expect(document.activeElement).toBe(trigger)
  expect(trigger.matches(':focus-visible')).toBe(true)
  expect(getComputedStyle(attachment).getPropertyValue('--attachment-ring').trim()).toBe(
    getComputedStyle(attachment).getPropertyValue('--ring').trim()
  )
})

it('上传和错误状态使用状态驱动的媒体、标题与语义 Token', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Attachment,
        { state: 'uploading' },
        {
          default: () => [
            h(
              AttachmentMedia,
              { variant: 'image' },
              { default: () => h('img', { alt: '上传中', src: '/uploading.png' }) }
            ),
            h(AttachmentTitle, {}, { default: () => 'uploading.png' })
          ]
        }
      )
  })
  const uploadingPage = render(Fixture)
  const uploadingMedia = uploadingPage.container.querySelector(
    '[data-slot="attachment-media"]'
  ) as HTMLElement
  const uploadingTitle = uploadingPage.container.querySelector(
    '[data-slot="attachment-title"]'
  ) as HTMLElement
  const errorPage = render(Attachment, { props: { state: 'error' } })
  const errorAttachment = errorPage.container.querySelector(
    '[data-slot="attachment"]'
  ) as HTMLElement

  expect(getComputedStyle(uploadingMedia).opacity).toBe('0.6')
  expect(getComputedStyle(uploadingTitle).animationName).toBe('attachment-shimmer')
  expect(getComputedStyle(errorAttachment).getPropertyValue('--attachment-fg').trim()).toBe(
    getComputedStyle(errorAttachment).getPropertyValue('--destructive').trim()
  )
})

it('分组提供横向滚动与滚动吸附，并在暗色主题中继承 Card 表面', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        AttachmentGroup,
        {},
        {
          default: () => [h(Attachment), h(Attachment)]
        }
      )
  })
  const page = render(Fixture)
  const host = page.container as HTMLElement
  const group = page.container.querySelector('[data-slot="attachment-group"]') as HTMLElement
  const attachment = page.container.querySelector('[data-slot="attachment"]') as HTMLElement

  expect(getComputedStyle(group).overflowX).toBe('auto')
  expect(getComputedStyle(group).scrollSnapType).toContain('x')
  expect(getComputedStyle(attachment).scrollSnapAlign).toBe('start')

  host.dataset.theme = 'dark'
  expect(getComputedStyle(attachment).getPropertyValue('--attachment-bg').trim()).toBe(
    getComputedStyle(attachment).getPropertyValue('--card').trim()
  )
})

it('变体映射为根、媒体和子槽位提供稳定类', () => {
  const slots = attachmentVariants({ size: 'sm', orientation: 'vertical', variant: 'image' })

  expect(slots.base()).toContain('attachment--sm')
  expect(slots.base()).toContain('attachment--vertical')
  expect(slots.media()).toContain('attachment__media--image')
  expect(slots.title()).toContain('attachment__title')
  expect(slots.trigger()).toContain('attachment__trigger')
})
