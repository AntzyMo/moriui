import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Tooltip from '../src/components/tooltip/Tooltip.vue'
import TooltipArrow from '../src/components/tooltip/TooltipArrow.vue'
import TooltipPortal from '../src/components/tooltip/TooltipPortal.vue'
import TooltipContent from '../src/components/tooltip/TooltipContent.vue'
import TooltipTrigger from '../src/components/tooltip/TooltipTrigger.vue'
import TooltipProvider from '../src/components/tooltip/TooltipProvider.vue'

import './tooltip.style.css'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

function createFixture(options: { controlled?: boolean, disabled?: boolean, showArrow?: boolean } = {}) {
  const open = ref(false)
  const onUpdateOpen = vi.fn((value: boolean) => {
    open.value = value
  })

  const Fixture = defineComponent({
    setup: () => () => h(TooltipProvider, {
      delayDuration: 0,
      disabled: options.disabled
    }, {
      default: () => h(Tooltip, (options.controlled
        ? { 'open': open.value, 'onUpdate:open': onUpdateOpen }
        : {}), {
        default: () => [
          h(TooltipTrigger, { asChild: true }, {
            default: () => h('button', {
              'class': 'custom-trigger',
              'data-testid': 'trigger'
            }, '显示说明')
          }),
          h(TooltipPortal, {}, {
            default: () => h(TooltipContent, {
              'class': 'custom-content',
              'side': 'bottom',
              'data-testid': 'content'
            }, {
              default: () => [
                ...(options.showArrow ? [h(TooltipArrow, { class: 'custom-arrow' })] : []),
                h('span', { 'data-testid': 'content-copy' }, 'Tooltip 说明')
              ]
            })
          })
        ]
      })
    })
  })

  return { Fixture, onUpdateOpen, open }
}

async function waitForTimers(delay = 0) {
  await new Promise(resolve => setTimeout(resolve, delay))
  await nextTick()
  await nextTick()
}

function movePointer(trigger: HTMLElement) {
  trigger.dispatchEvent(new PointerEvent('pointermove', {
    bubbles: true,
    pointerType: 'mouse'
  }))
}

async function openTooltip(Fixture: ReturnType<typeof createFixture>['Fixture']) {
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  movePointer(trigger)
  await waitForTimers()

  const content = document.body.querySelector('[data-slot="tooltip-content"]') as HTMLElement
  return { content, page, trigger }
}

function getReducedMotionRule() {
  function findRule(rules: CSSRuleList | CSSRule[]): CSSStyleRule | undefined {
    for (const rule of rules) {
      if (rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion')) {
        const contentRule = Array.from(rule.cssRules)
          .find((childRule): childRule is CSSStyleRule => childRule instanceof CSSStyleRule
            && childRule.selectorText.includes('.tooltip__content'))

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

it('通过显式 Portal 打开到 body，并保留槽位、调用方类名和可选 Arrow', async () => {
  const { Fixture } = createFixture({ showArrow: true })
  const { content, trigger } = await openTooltip(Fixture)

  expect(content).not.toBeNull()
  expect(document.body.contains(content)).toBe(true)
  expect(trigger.parentElement?.contains(content)).toBe(false)
  expect(trigger.classList).toContain('tooltip__trigger')
  expect(trigger.classList).toContain('custom-trigger')
  expect(content.classList).toContain('tooltip__content')
  expect(content.classList).toContain('custom-content')
  expect(content.dataset.state).toBe('delayed-open')
  expect(content.dataset.side).toBe('bottom')
  expect(content.querySelector('[data-slot="tooltip-arrow"]')?.classList).toContain('tooltip__arrow')
  expect(content.querySelector('[data-slot="tooltip-arrow"]')?.classList).toContain('custom-arrow')
  expect(getComputedStyle(content.querySelector('[data-slot="tooltip-arrow"]') as SVGElement).transform).toBe('none')
  expect(content.querySelector('[data-testid="content-copy"]')?.textContent).toBe('Tooltip 说明')
})

it('tooltipProvider 默认在悬停 300ms 后打开', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(TooltipProvider, {}, {
      default: () => h(Tooltip, {}, {
        default: () => [
          h(TooltipTrigger, { asChild: true }, {
            default: () => h('button', { 'data-testid': 'default-delay-trigger' }, '显示说明')
          }),
          h(TooltipPortal, {}, {
            default: () => h(TooltipContent, { 'data-testid': 'default-delay-content' }, {
              default: () => 'Tooltip 说明'
            })
          })
        ]
      })
    })
  })
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="default-delay-trigger"]') as HTMLButtonElement

  movePointer(trigger)
  await waitForTimers(250)
  expect(document.body.querySelector('[data-testid="default-delay-content"]')).toBeNull()

  await waitForTimers(100)
  expect(document.body.querySelector('[data-testid="default-delay-content"]')).not.toBeNull()
})

it('同一 Provider 内的后续 Tooltip 会跳过延迟', async () => {
  const Fixture = defineComponent({
    setup: () => () => h(TooltipProvider, {
      delayDuration: 300,
      skipDelayDuration: 300
    }, {
      default: () => ['first', 'second'].map(id => h(Tooltip, { key: id }, {
        default: () => [
          h(TooltipTrigger, { asChild: true }, {
            default: () => h('button', { 'data-testid': `${id}-trigger` }, id)
          }),
          h(TooltipPortal, {}, {
            default: () => h(TooltipContent, { 'data-testid': `${id}-content` }, {
              default: () => `${id} tooltip`
            })
          })
        ]
      }))
    })
  })
  const page = render(Fixture)
  const firstTrigger = page.container.querySelector('[data-testid="first-trigger"]') as HTMLButtonElement
  const secondTrigger = page.container.querySelector('[data-testid="second-trigger"]') as HTMLButtonElement

  movePointer(firstTrigger)
  await waitForTimers(350)
  expect(document.body.querySelector('[data-testid="first-content"]')).not.toBeNull()

  firstTrigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
  await waitForTimers()
  movePointer(secondTrigger)
  await waitForTimers()
  expect(document.body.querySelector('[data-testid="second-content"]')).not.toBeNull()
})

it('受控 v-model:open 接收键盘焦点打开与失焦关闭事件，并关联辅助说明', async () => {
  const { Fixture, onUpdateOpen, open } = createFixture({ controlled: true })
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
  await waitForTimers()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(true)
  expect(open.value).toBe(true)

  const content = document.body.querySelector('[data-slot="tooltip-content"]') as HTMLElement
  const descriptionId = trigger.getAttribute('aria-describedby')
  expect(content.dataset.state).toBe('instant-open')
  expect(descriptionId).toBeTruthy()
  expect(document.getElementById(descriptionId!)?.textContent).toBe('Tooltip 说明')

  trigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
  await waitForTimers()
  expect(onUpdateOpen).toHaveBeenLastCalledWith(false)
  expect(open.value).toBe(false)
})

it('禁用 Provider 后不会响应悬停或渲染内容', async () => {
  const { Fixture } = createFixture({ disabled: true })
  const page = render(Fixture)
  const trigger = page.container.querySelector('[data-testid="trigger"]') as HTMLButtonElement

  movePointer(trigger)
  await waitForTimers()
  expect(document.body.querySelector('[data-slot="tooltip-content"]')).toBeNull()
})

it('内容对齐主题浮层、方向动效和减少动效规则', async () => {
  const { Fixture } = createFixture()
  const { content, trigger } = await openTooltip(Fixture)

  expect(getComputedStyle(content).display).toBe('inline-flex')
  expect(getComputedStyle(content).fontSize).toBe('12px')
  expect(getComputedStyle(content).gap).toBe('6px')
  expect(getComputedStyle(content).borderRadius).toBe('10px')
  expect(getComputedStyle(content).boxShadow).not.toBe('none')
  expect(getComputedStyle(content).animationDuration).toBe('0.1s')
  expect(getComputedStyle(content).getPropertyValue('--tooltip-content-bg').trim()).toBe('oklch(1 0 0)')
  expect(getComputedStyle(content).getPropertyValue('--tooltip-content-fg').trim()).toBe('oklch(0 0 0)')
  expect(getComputedStyle(content).getPropertyValue('--tooltip-slide').trim()).toBe('0 -0.5rem')
  expect(Math.round(content.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom)).toBe(4)

  document.documentElement.dataset.theme = 'dark'
  expect(getComputedStyle(content).getPropertyValue('--tooltip-content-bg').trim()).toBe('oklch(0.205 0 0)')
  expect(getComputedStyle(content).getPropertyValue('--tooltip-content-fg').trim()).toBe('oklch(0.985 0 0)')
  expect(getReducedMotionRule()?.style.animationDuration).toBe('0ms')
})
