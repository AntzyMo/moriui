import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Bubble from '../src/components/bubble/Bubble.vue'
import Message from '../src/components/message/Message.vue'
import MessageGroup from '../src/components/message/MessageGroup.vue'
import BubbleContent from '../src/components/bubble/BubbleContent.vue'
import MessageAvatar from '../src/components/message/MessageAvatar.vue'
import MessageFooter from '../src/components/message/MessageFooter.vue'
import MessageHeader from '../src/components/message/MessageHeader.vue'
import MessageContent from '../src/components/message/MessageContent.vue'
import { messageAvatarVariants, messageVariants } from '../src/components/message/variants'

import './style.css'

it('渲染完整消息结构，并保留根元素属性、事件和调用方样式', () => {
  const onClick = vi.fn()
  const page = render(MessageGroup, {
    slots: {
      default: () => h(Message, {
        'aria-label': '客服回复',
        'class': 'custom-message',
        'data-testid': 'support-message',
        onClick
      }, {
        default: () => [
          h(MessageAvatar, { 'aria-label': '客服头像' }, { default: () => '客' }),
          h(MessageContent, {}, {
            default: () => [
              h(MessageHeader, {}, { default: () => '客服 · 刚刚' }),
              h(Bubble, { variant: 'secondary' }, {
                default: () => h(BubbleContent, {}, { default: () => '你好，我可以协助处理这个问题。' })
              }),
              h(MessageFooter, {}, { default: () => '已送达' })
            ]
          })
        ]
      })
    }
  })
  const group = page.container.querySelector('[data-slot="message-group"]') as HTMLElement
  const message = page.container.querySelector('[data-slot="message"]') as HTMLElement
  const avatar = page.container.querySelector('[data-slot="message-avatar"]') as HTMLElement
  const content = page.container.querySelector('[data-slot="message-content"]') as HTMLElement
  const header = page.container.querySelector('[data-slot="message-header"]') as HTMLElement
  const footer = page.container.querySelector('[data-slot="message-footer"]') as HTMLElement

  expect(message.dataset.align).toBe('start')
  expect(message.classList).toContain('message')
  expect(message.classList).toContain('custom-message')
  expect(message.getAttribute('aria-label')).toBe('客服回复')
  expect(message.dataset.testid).toBe('support-message')
  expect(avatar.getAttribute('aria-label')).toBe('客服头像')
  expect(header.textContent).toBe('客服 · 刚刚')
  expect(footer.textContent).toBe('已送达')
  expect(getComputedStyle(group).gap).toBe('8px')
  expect(getComputedStyle(avatar).minWidth).toBe('32px')
  expect(getComputedStyle(content).overflowWrap).toBe('break-word')
  expect(getComputedStyle(header).fontSize).toBe('12px')
  expect(getComputedStyle(header).paddingLeft).toBe('12px')
  expect(getComputedStyle(avatar).transform).not.toBe('none')

  message.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('右对齐消息反向排列内容，并使元信息与内容右对齐', () => {
  const page = render(Message, {
    props: { align: 'end' },
    slots: {
      default: () => [
        h(MessageAvatar, {}, { default: () => '我' }),
        h(MessageContent, {}, {
          default: () => [
            h(MessageHeader, {}, { default: () => '我 · 刚刚' }),
            h(Bubble, {}, { default: () => h(BubbleContent, {}, { default: () => '收到。' }) }),
            h(MessageFooter, {}, { default: () => '已读' })
          ]
        })
      ]
    }
  })
  const message = page.container.querySelector('[data-slot="message"]') as HTMLElement
  const header = page.container.querySelector('[data-slot="message-header"]') as HTMLElement
  const footer = page.container.querySelector('[data-slot="message-footer"]') as HTMLElement

  expect(message.dataset.align).toBe('end')
  expect(message.classList).toContain('message--end')
  expect(getComputedStyle(message).flexDirection).toBe('row-reverse')
  expect(getComputedStyle(header).alignSelf).toBe('flex-end')
  expect(getComputedStyle(footer).alignSelf).toBe('flex-end')
  expect(getComputedStyle(footer).justifyContent).toBe('flex-end')
  expect(messageVariants().base({ align: 'end' })).toContain('message--end')
})

it('保留 messageAvatarVariants 的 base slot 兼容性', () => {
  expect(messageAvatarVariants().base()).toContain('message-avatar')
})

it('ghost Bubble 会移除消息元信息的水平内边距', () => {
  const page = render(Message, {
    slots: {
      default: () => h(MessageContent, {}, {
        default: () => [
          h(MessageHeader, {}, { default: () => '助手' }),
          h(Bubble, { variant: 'ghost' }, { default: () => h(BubbleContent, {}, { default: () => '长文本回复' }) }),
          h(MessageFooter, {}, { default: () => '内部备注' })
        ]
      })
    }
  })
  const header = page.container.querySelector('[data-slot="message-header"]') as HTMLElement
  const footer = page.container.querySelector('[data-slot="message-footer"]') as HTMLElement

  expect(getComputedStyle(header).paddingLeft).toBe('0px')
  expect(getComputedStyle(footer).paddingRight).toBe('0px')
})

it('六个组件均支持多态渲染', () => {
  const MessageFixture = defineComponent({
    setup: () => () => h(Message, { asChild: true }, {
      default: () => h('article', { 'data-testid': 'message-as-child' }, '消息')
    })
  })
  const AvatarFixture = defineComponent({
    setup: () => () => h(MessageAvatar, { as: 'a', href: '#avatar' }, { default: () => '头像' })
  })
  const ContentFixture = defineComponent({
    setup: () => () => h(MessageContent, { asChild: true }, {
      default: () => h('section', { 'data-testid': 'content-as-child' }, '内容')
    })
  })
  const FooterFixture = defineComponent({
    setup: () => () => h(MessageFooter, { as: 'footer' }, { default: () => '页脚' })
  })
  const GroupFixture = defineComponent({
    setup: () => () => h(MessageGroup, { asChild: true }, {
      default: () => h('ol', { 'data-testid': 'group-as-child' })
    })
  })
  const HeaderFixture = defineComponent({
    setup: () => () => h(MessageHeader, { as: 'header' }, { default: () => '标题' })
  })

  expect(render(MessageFixture).container.querySelector('article')?.dataset.slot).toBe('message')
  expect(render(AvatarFixture).container.querySelector('a')?.getAttribute('href')).toBe('#avatar')
  expect(render(ContentFixture).container.querySelector('section')?.dataset.slot).toBe('message-content')
  expect(render(FooterFixture).container.querySelector('footer')?.dataset.slot).toBe('message-footer')
  expect(render(GroupFixture).container.querySelector('ol')?.dataset.slot).toBe('message-group')
  expect(render(HeaderFixture).container.querySelector('header')?.dataset.slot).toBe('message-header')
})

it('头像与元信息使用当前主题的语义 Token', () => {
  const page = render(Message, {
    slots: {
      default: () => [
        h(MessageAvatar, {}, { default: () => '客' }),
        h(MessageContent, {}, { default: () => h(MessageHeader, {}, { default: () => '客服' }) })
      ]
    }
  })
  const host = page.container as HTMLElement
  const avatar = page.container.querySelector('[data-slot="message-avatar"]') as HTMLElement
  const header = page.container.querySelector('[data-slot="message-header"]') as HTMLElement
  const lightMuted = getComputedStyle(avatar).getPropertyValue('--muted').trim()
  const lightMutedForeground = getComputedStyle(header).getPropertyValue('--muted-foreground').trim()

  host.dataset.theme = 'dark'

  expect(getComputedStyle(avatar).getPropertyValue('--muted').trim()).not.toBe(lightMuted)
  expect(getComputedStyle(header).getPropertyValue('--muted-foreground').trim()).not.toBe(lightMutedForeground)
})
