import { expect, it } from 'vite-plus/test'
import type { ComponentPublicInstance } from 'vue'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import MessageScroller from '../src/components/message-scroller/MessageScroller.vue'
import { messageScrollerVariants } from '../src/components/message-scroller/variants'
import MessageScrollerItem from '../src/components/message-scroller/MessageScrollerItem.vue'
import MessageScrollerButton from '../src/components/message-scroller/MessageScrollerButton.vue'
import MessageScrollerContent from '../src/components/message-scroller/MessageScrollerContent.vue'
import MessageScrollerProvider from '../src/components/message-scroller/MessageScrollerProvider.vue'
import MessageScrollerViewport from '../src/components/message-scroller/MessageScrollerViewport.vue'

import './style.css'

interface ProviderInstance extends ComponentPublicInstance {
  scrollToEnd: (options?: { behavior?: ScrollBehavior }) => boolean
  scrollToMessage: (messageId: string, options?: { behavior?: ScrollBehavior }) => boolean
}

async function settle() {
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

function createFixture(autoScroll = false) {
  const provider = ref<ProviderInstance>()
  const messages = ref(['m1', 'm2', 'm3'])
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        MessageScrollerProvider,
        { ref: provider, autoScroll },
        {
          default: () =>
            h(
              MessageScroller,
              { class: 'custom-scroller', style: 'height: 160px; width: 320px;' },
              {
                default: () => [
                  h(
                    MessageScrollerViewport,
                    {},
                    {
                      default: () =>
                        h(
                          MessageScrollerContent,
                          { class: 'gap-2 p-2' },
                          {
                            default: () =>
                              messages.value.map((id, index) =>
                                h(
                                  MessageScrollerItem,
                                  {
                                    key: id,
                                    messageId: id,
                                    scrollAnchor: index === 0
                                  },
                                  {
                                    default: () => h('article', { style: 'height: 96px;' }, id)
                                  }
                                )
                              )
                          }
                        )
                    }
                  ),
                  h(MessageScrollerButton)
                ]
              }
            )
        }
      )
  })
  return { page: render(Fixture), provider, messages }
}

it('渲染组合槽位、默认无障碍语义与稳定变体类', async () => {
  const { page } = createFixture()
  await settle()

  const root = page.container.querySelector('[data-slot="message-scroller"]') as HTMLElement
  const viewport = page.container.querySelector(
    '[data-slot="message-scroller-viewport"]'
  ) as HTMLElement
  const content = page.container.querySelector(
    '[data-slot="message-scroller-content"]'
  ) as HTMLElement
  const button = page.container.querySelector(
    '[data-slot="message-scroller-button"]'
  ) as HTMLButtonElement

  expect(root.classList).toContain('message-scroller')
  expect(root.classList).toContain('custom-scroller')
  expect(viewport.getAttribute('role')).toBe('region')
  expect(viewport.getAttribute('aria-label')).toBe('消息')
  expect(content.getAttribute('role')).toBe('log')
  expect(content.getAttribute('aria-relevant')).toBe('additions')
  expect(page.container.querySelectorAll('[data-slot="message-scroller-item"]')).toHaveLength(3)
  expect(button.dataset.direction).toBe('end')
  expect(button.dataset.variant).toBe('secondary')
  expect(button.dataset.size).toBe('icon-sm')
  expect(getComputedStyle(button).getPropertyValue('--button-bg').trim()).toBe(
    getComputedStyle(button).getPropertyValue('--background').trim()
  )
  expect(messageScrollerVariants().root()).toContain('message-scroller')
  expect(messageScrollerVariants({ direction: 'start' }).button()).toContain(
    'message-scroller__button--start'
  )
})

it('支持命令式跳转和末尾滚动按钮', async () => {
  const { page, provider } = createFixture()
  await settle()
  const root = page.container.querySelector('[data-slot="message-scroller"]') as HTMLElement
  const viewport = page.container.querySelector(
    '[data-slot="message-scroller-viewport"]'
  ) as HTMLElement
  const button = page.container.querySelector(
    '[data-slot="message-scroller-button"]'
  ) as HTMLButtonElement

  expect(provider.value?.scrollToMessage('m2')).toBe(true)
  await settle()
  expect(viewport.scrollTop).toBeGreaterThan(0)

  viewport.scrollTop = 0
  viewport.dispatchEvent(new Event('scroll'))
  await settle()
  expect(root.dataset.scrollable).toContain('end')
  expect(button.disabled).toBe(false)
  button.click()
  await new Promise(resolve => window.setTimeout(resolve, 250))
  expect(viewport.scrollTop).toBeGreaterThan(0)
})

it('前插历史消息时保留当前阅读位置', async () => {
  const { page, messages } = createFixture()
  await settle()
  const viewport = page.container.querySelector(
    '[data-slot="message-scroller-viewport"]'
  ) as HTMLElement
  viewport.scrollTop = 100
  viewport.dispatchEvent(new Event('scroll'))
  await settle()
  const before = viewport.scrollTop

  messages.value.unshift('history')
  await settle()

  expect(viewport.scrollTop).toBeGreaterThanOrEqual(before)
})

it('在 RTL 下修正按钮定位，并保留细滚动条样式', async () => {
  const { page } = createFixture()
  await settle()
  const root = page.container.querySelector('[data-slot="message-scroller"]') as HTMLElement
  const viewport = page.container.querySelector(
    '[data-slot="message-scroller-viewport"]'
  ) as HTMLElement
  const button = page.container.querySelector(
    '[data-slot="message-scroller-button"]'
  ) as HTMLButtonElement
  const ltrTransform = getComputedStyle(button).transform

  root.dir = 'rtl'
  await nextTick()

  expect(getComputedStyle(button).transform).not.toBe(ltrTransform)
  expect(getComputedStyle(viewport).scrollbarWidth).toBe('thin')
})
