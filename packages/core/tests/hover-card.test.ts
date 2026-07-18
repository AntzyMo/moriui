import { afterEach, expect, it, vi } from 'vite-plus/test'

import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import HoverCard from '../src/components/hover-card/HoverCard.vue'
import HoverCardArrow from '../src/components/hover-card/HoverCardArrow.vue'
import HoverCardPortal from '../src/components/hover-card/HoverCardPortal.vue'
import HoverCardContent from '../src/components/hover-card/HoverCardContent.vue'
import HoverCardTrigger from '../src/components/hover-card/HoverCardTrigger.vue'

import './hover-card.style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createFixture(options: { controlled?: boolean, showArrow?: boolean } = {}) {
  const open = ref(false)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })

  const Fixture = defineComponent({
    setup: () => () =>
      h(
        HoverCard,
        {
          ...(options.controlled ? { 'open': open.value, 'onUpdate:open': onUpdateOpen } : {}),
          openDelay: 0,
          closeDelay: 0
        },
        {
          default: () => [
            h(
              HoverCardTrigger,
              { asChild: true },
              {
                default: () =>
                  h(
                    'button',
                    {
                      'class': 'custom-trigger',
                      'data-testid': 'trigger'
                    },
                    '查看个人资料'
                  )
              }
            ),
            h(
              HoverCardPortal,
              {},
              {
                default: () =>
                  h(
                    HoverCardContent,
                    {
                      class: 'custom-content',
                      side: 'bottom'
                    },
                    {
                      default: () => [
                        ...(options.showArrow
                          ? [h(HoverCardArrow, { class: 'custom-arrow' })]
                          : []),
                        h('p', { 'data-testid': 'content-copy' }, 'MoriUI 组件库')
                      ]
                    }
                  )
              }
            )
          ]
        }
      )
  })

  return { Fixture, onUpdateOpen, open }
}

function createDefaultDelayFixture() {
  const open = ref(false)

  const Fixture = defineComponent({
    setup: () => () =>
      h(
        HoverCard,
        {
          'open': open.value,
          'onUpdate:open': (value: boolean) => {
            open.value = value
          },
          'closeDelay': 0
        },
        {
          default: () => [
            h(
              HoverCardTrigger,
              {
                'asChild': true,
                'data-testid': 'default-delay-trigger'
              },
              {
                default: () =>
                  h('button', { 'data-testid': 'default-delay-trigger' }, '查看个人资料')
              }
            ),
            h(
              HoverCardPortal,
              {},
              {
                default: () =>
                  h(
                    HoverCardContent,
                    {},
                    {
                      default: () => 'MoriUI 组件库'
                    }
                  )
              }
            )
          ]
        }
      )
  })

  return { Fixture, open }
}

async function waitForTimers() {
  await new Promise(resolve => setTimeout(resolve, 0))
  await nextTick()
  await nextTick()
}

async function openHoverCard(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
  await waitForTimers()

  const content = document.body.querySelector('[data-slot="hover-card-content"]') as HTMLElement
  return { content, page, trigger }
}

function getReducedMotionRule() {
  function findRule(rules: CSSRuleList | CSSRule[]): CSSStyleRule | undefined {
    for (const rule of rules) {
      if (rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion')) {
        const contentRule = Array.from(rule.cssRules).find(
          (childRule): childRule is CSSStyleRule =>
            childRule instanceof CSSStyleRule
            && childRule.selectorText.includes('.hover-card__content')
        )

        if (contentRule)
          return contentRule
      }

      if ('cssRules' in rule) {
        const contentRule = findRule(rule.cssRules)
        if (contentRule)
          return contentRule
      }
    }
  }

  for (const styleSheet of document.styleSheets) {
    try {
      const contentRule = findRule(styleSheet.cssRules)
      if (contentRule)
        return contentRule
    } catch {
      continue
    }
  }
}

it('悬停后打开、显式 Portal 到 body，并保留稳定槽位与调用方类名', async () => {
  const { Fixture } = createFixture({ showArrow: true })
  const { content, trigger } = await openHoverCard(Fixture)

  expect(content).not.toBeNull()
  expect(document.body.contains(content)).toBe(true)
  expect(trigger.parentElement?.contains(content)).toBe(false)
  expect(trigger.classList).toContain('hover-card__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(content.classList).toContain('hover-card__content')
  expect(content.classList).toContain('custom-content')
  expect(content.dataset.state).toBe('open')
  expect(content.dataset.side).toBe('bottom')
  expect(content.querySelector('[data-slot="hover-card-arrow"]')?.classList).toContain(
    'hover-card__arrow'
  )
  expect(content.querySelector('[data-slot="hover-card-arrow"]')?.classList).toContain(
    'custom-arrow'
  )
  expect(content.querySelector('[data-testid="content-copy"]')?.textContent).toBe('MoriUI 组件库')
})

it('默认不渲染箭头，调用方可按需组合 Arrow 原语', async () => {
  const { Fixture } = createFixture()
  const { content, trigger } = await openHoverCard(Fixture)

  expect(content.querySelector('[data-slot="hover-card-arrow"]')).toBeNull()
  expect(
    Math.round(content.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom)
  ).toBe(4)
})

it('默认在悬停 300ms 后打开', async () => {
  const { Fixture, open } = createDefaultDelayFixture()
  const page = render(Fixture)
  const trigger = page.container.querySelector(
    '[data-testid="default-delay-trigger"]'
  ) as HTMLButtonElement

  trigger.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
  await new Promise(resolve => setTimeout(resolve, 250))
  expect(open.value).toBe(false)

  await new Promise(resolve => setTimeout(resolve, 100))
  expect(open.value).toBe(true)
})

it('受控 v-model:open 会接收焦点打开与失焦关闭事件', async () => {
  const { Fixture, onUpdateOpen, open } = createFixture({ controlled: true })
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
  await waitForTimers()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(true)
  expect(open.value).toBe(true)

  trigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
  await waitForTimers()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(false)
  expect(open.value).toBe(false)
})

it('内容消费 Nova 浮层 Token、固定宽度与方向动效', async () => {
  const { Fixture } = createFixture()
  const { content } = await openHoverCard(Fixture)

  expect(getComputedStyle(content).width).toBe('256px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).animationDuration).toBe('0.1s')
  expect(getComputedStyle(content).getPropertyValue('--hover-card-content-bg').trim()).toBe(
    'oklch(1 0 0)'
  )
  expect(getComputedStyle(content).getPropertyValue('--hover-card-slide').trim()).toBe('0 -0.5rem')

  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--hover-card-content-bg').trim()).toBe(
    'oklch(0.205 0 0)'
  )
})

it('减少动效偏好会取消 Hover Card 动画', () => {
  expect(getReducedMotionRule()?.style.animationDuration).toBe('0ms')
})
