import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Bubble from '../src/components/bubble/Bubble.vue'
import Button from '../src/components/button/Button.vue'
import BubbleGroup from '../src/components/bubble/BubbleGroup.vue'
import BubbleContent from '../src/components/bubble/BubbleContent.vue'
import BubbleReactions from '../src/components/bubble/BubbleReactions.vue'
import { bubbleReactionsVariants } from '../src/components/bubble/variants'

import './style.css'

it('默认渲染 Bubble，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Bubble, {
    attrs: {
      'aria-label': '客户消息',
      'data-testid': 'customer-message',
      onClick
    },
    props: { class: 'custom-bubble' },
    slots: { default: () => h(BubbleContent, {}, { default: () => '你好' }) }
  })
  const bubble = page.container.querySelector('[data-slot="bubble"]') as HTMLElement
  const content = page.container.querySelector('[data-slot="bubble-content"]') as HTMLElement

  expect(bubble.tagName).toBe('DIV')
  expect(bubble.dataset.variant).toBe('default')
  expect(bubble.dataset.align).toBe('start')
  expect(bubble.classList).toContain('bubble')
  expect(bubble.classList).toContain('bubble--default')
  expect(bubble.classList).toContain('custom-bubble')
  expect(bubble.getAttribute('aria-label')).toBe('客户消息')
  expect(bubble.dataset.testid).toBe('customer-message')
  expect(content.textContent).toBe('你好')

  bubble.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('四个组件均支持多态渲染', () => {
  const BubbleFixture = defineComponent({
    setup: () => () => h(Bubble, { asChild: true }, {
      default: () => h('article', { 'data-testid': 'bubble-as-child' }, '消息')
    })
  })
  const ContentFixture = defineComponent({
    setup: () => () => h(BubbleContent, { as: 'a', href: '#message' }, { default: () => '查看消息' })
  })
  const GroupFixture = defineComponent({
    setup: () => () => h(BubbleGroup, { asChild: true }, {
      default: () => h('section', { 'data-testid': 'group-as-child' })
    })
  })
  const ReactionsFixture = defineComponent({
    setup: () => () => h(BubbleReactions, { asChild: true }, {
      default: () => h('output', { 'data-testid': 'reactions-as-child' }, '👍')
    })
  })

  expect(render(BubbleFixture).container.querySelector('article')?.dataset.slot).toBe('bubble')
  expect(render(ContentFixture).container.querySelector('a')?.getAttribute('href')).toBe('#message')
  expect(render(GroupFixture).container.querySelector('section')?.dataset.slot).toBe('bubble-group')
  expect(render(ReactionsFixture).container.querySelector('output')?.dataset.slot).toBe('bubble-reactions')
})

it.each([
  ['default', 'bubble--default'],
  ['secondary', 'bubble--secondary'],
  ['muted', 'bubble--muted'],
  ['tinted', 'bubble--tinted'],
  ['outline', 'bubble--outline'],
  ['ghost', 'bubble--ghost'],
  ['destructive', 'bubble--destructive']
] as const)('应用 %s 变体与局部 Token', variant => {
  const page = render(Bubble, {
    props: { variant },
    slots: { default: () => h(BubbleContent, {}, { default: () => '消息内容' }) }
  })
  const bubble = page.container.querySelector('[data-slot="bubble"]') as HTMLElement
  const content = page.container.querySelector('[data-slot="bubble-content"]') as HTMLElement

  expect(bubble.classList).toContain(`bubble--${variant}`)
  expect(getComputedStyle(bubble).getPropertyValue('--bubble-bg').trim()).not.toBe('')
  expect(getComputedStyle(content).backgroundColor).not.toBe('')
})

it('对齐、Ghost 全宽与长文本换行符合消息布局', () => {
  const endPage = render(Bubble, {
    props: { align: 'end' },
    slots: { default: () => h(BubbleContent, {}, { default: () => '右侧消息' }) }
  })
  const endBubble = endPage.container.querySelector('[data-slot="bubble"]') as HTMLElement
  expect(endBubble.dataset.align).toBe('end')
  expect(getComputedStyle(endBubble).alignSelf).toBe('flex-end')
  expect(getComputedStyle(endBubble).maxWidth).toBe('80%')

  const ghostPage = render(Bubble, {
    props: { variant: 'ghost' },
    slots: { default: () => h(BubbleContent, {}, { default: () => '没有气泡表面的长文本内容' }) }
  })
  const ghostBubble = ghostPage.container.querySelector('[data-slot="bubble"]') as HTMLElement
  const ghostContent = ghostPage.container.querySelector('[data-slot="bubble-content"]') as HTMLElement
  expect(getComputedStyle(ghostBubble).maxWidth).toBe('100%')
  expect(getComputedStyle(ghostContent).paddingTop).toBe('0px')
  expect(getComputedStyle(ghostContent).overflowWrap).toBe('break-word')
})

it('亮暗主题中的默认气泡继承对应 primary Token', () => {
  const page = render(Bubble, {
    slots: { default: () => h(BubbleContent, {}, { default: () => '主题消息' }) }
  })
  const host = page.container as HTMLElement
  const bubble = page.container.querySelector('[data-slot="bubble"]') as HTMLElement

  expect(getComputedStyle(bubble).getPropertyValue('--bubble-bg').trim()).toBe(
    getComputedStyle(bubble).getPropertyValue('--primary').trim()
  )

  host.dataset.theme = 'dark'

  expect(getComputedStyle(bubble).getPropertyValue('--bubble-bg').trim()).toBe(
    getComputedStyle(bubble).getPropertyValue('--primary').trim()
  )
})

it('bubbleGroup 提供纵向分组间距', () => {
  const page = render(BubbleGroup, {
    slots: {
      default: () => [
        h(Bubble, {}, { default: () => h(BubbleContent, {}, { default: () => '第一条' }) }),
        h(Bubble, {}, { default: () => h(BubbleContent, {}, { default: () => '第二条' }) })
      ]
    }
  })
  const group = page.container.querySelector('[data-slot="bubble-group"]') as HTMLElement

  expect(getComputedStyle(group).display).toBe('flex')
  expect(getComputedStyle(group).flexDirection).toBe('column')
  expect(getComputedStyle(group).gap).toBe('8px')
})

it.each([
  ['top', 'start'],
  ['top', 'end'],
  ['bottom', 'start'],
  ['bottom', 'end']
] as const)('reaction 支持 side=%s、align=%s', (side, align) => {
  const page = render(Bubble, {
    slots: {
      default: () => [
        h(BubbleContent, {}, { default: () => '带反应的消息' }),
        h(BubbleReactions, { side, align }, { default: () => '👍' })
      ]
    }
  })
  const reactions = page.container.querySelector('[data-slot="bubble-reactions"]') as HTMLElement

  expect(reactions.dataset.side).toBe(side)
  expect(reactions.dataset.align).toBe(align)
  expect(reactions.classList).toContain(`bubble__reactions--${side}`)
  expect(reactions.classList).toContain(`bubble__reactions--${align}`)
  expect(bubbleReactionsVariants().reactions({ side, align })).toContain(`bubble__reactions--${side}`)
  expect(getComputedStyle(reactions).zIndex).toBe('10')
  expect(getComputedStyle(reactions).boxShadow).not.toBe('none')
})

it('reaction 可直接承载 Button 并保留交互', () => {
  const onClick = vi.fn()
  const page = render(Bubble, {
    slots: {
      default: () => [
        h(BubbleContent, {}, { default: () => '按钮反应' }),
        h(BubbleReactions, {}, {
          default: () => h(Button, { onClick, size: 'xs', variant: 'ghost' }, { default: () => '赞' })
        })
      ]
    }
  })
  const reactions = page.container.querySelector('[data-slot="bubble-reactions"]') as HTMLElement
  const button = page.container.querySelector('[data-slot="button"]') as HTMLButtonElement

  expect(getComputedStyle(reactions).paddingTop).toBe('0px')
  button.click()
  expect(onClick).toHaveBeenCalledOnce()
})
