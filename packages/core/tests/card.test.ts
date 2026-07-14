import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Card from '../src/components/card/Card.vue'
import CardTitle from '../src/components/card/CardTitle.vue'
import CardAction from '../src/components/card/CardAction.vue'
import CardFooter from '../src/components/card/CardFooter.vue'
import CardHeader from '../src/components/card/CardHeader.vue'
import { cardVariants } from '../src/components/card/variants'
import CardContent from '../src/components/card/CardContent.vue'
import CardDescription from '../src/components/card/CardDescription.vue'

import './style.css'

it('默认渲染 Card 容器，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Card, {
    attrs: {
      'aria-label': '项目概览',
      'data-testid': 'project-card',
      onClick
    },
    props: {
      class: 'custom-card'
    },
    slots: {
      default: '卡片内容'
    }
  })
  const card = page.container.querySelector('[data-slot="card"]') as HTMLElement

  expect(card.tagName).toBe('DIV')
  expect(card.dataset.size).toBe('default')
  expect(card.classList).toContain('card')
  expect(card.classList).toContain('card--default-size')
  expect(card.classList).toContain('custom-card')
  expect(card.getAttribute('aria-label')).toBe('项目概览')
  expect(card.dataset.testid).toBe('project-card')

  card.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it.each(['default', 'sm'] as const)('应用 %s 密度类和局部间距 Token', size => {
  const page = render(Card, { props: { size } })
  const card = page.container.querySelector('[data-slot="card"]') as HTMLElement

  expect(card.classList).toContain(size === 'default' ? 'card--default-size' : 'card--sm')
  expect(getComputedStyle(card).getPropertyValue('--card-spacing').trim()).toBe(size === 'default' ? '1rem' : '0.75rem')
})

it('渲染完整组合槽位，并在操作区存在时应用 Header 网格布局', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Card, {}, {
      default: () => [
        h(CardHeader, {}, {
          default: () => [
            h(CardTitle, {}, { default: () => '项目概览' }),
            h(CardDescription, {}, { default: () => '查看发布状态。' }),
            h(CardAction, {}, { default: () => h('button', { type: 'button' }, '更多') })
          ]
        }),
        h(CardContent, {}, { default: () => '组件内容' }),
        h(CardFooter, {}, { default: () => '操作' })
      ]
    })
  })
  const page = render(Fixture)
  const card = page.container.querySelector('[data-slot="card"]') as HTMLElement
  const header = page.container.querySelector('[data-slot="card-header"]') as HTMLElement
  const action = page.container.querySelector('[data-slot="card-action"]') as HTMLElement

  expect(header.classList).toContain('card__header')
  expect(page.container.querySelector('[data-slot="card-title"]')?.classList).toContain('card__title')
  expect(page.container.querySelector('[data-slot="card-description"]')?.classList).toContain('card__description')
  expect(action.classList).toContain('card__action')
  expect(page.container.querySelector('[data-slot="card-content"]')?.classList).toContain('card__content')
  expect(page.container.querySelector('[data-slot="card-footer"]')?.classList).toContain('card__footer')
  expect(getComputedStyle(header).display).toBe('grid')
  expect(getComputedStyle(action).gridColumnStart).toBe('2')
  expect(getComputedStyle(action).gridRowEnd).toBe('span 2')
  expect(getComputedStyle(card).paddingBottom).toBe('0px')
})

it('页脚和直接图片遵循 Card 的表面、边界与圆角规则', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Card, {}, {
      default: () => [
        h('img', { alt: '预览图', src: '/preview.png' }),
        h(CardContent, {}, { default: () => '内容' }),
        h(CardFooter, {}, { default: () => '页脚' })
      ]
    })
  })
  const page = render(Fixture)
  const card = page.container.querySelector('[data-slot="card"]') as HTMLElement
  const image = page.container.querySelector('img') as HTMLImageElement
  const footer = page.container.querySelector('[data-slot="card-footer"]') as HTMLElement

  expect(getComputedStyle(card).paddingTop).toBe('0px')
  expect(getComputedStyle(image).borderTopLeftRadius).toBe('14px')
  expect(getComputedStyle(footer).borderTopWidth).toBe('1px')
  expect(getComputedStyle(footer).backgroundColor).not.toBe(getComputedStyle(card).backgroundColor)
})

it('消费 Card 语义 Token，支持局部 Token 覆盖与主题切换', () => {
  const defaultPage = render(Card)
  const tokenPage = render(Card, {
    attrs: {
      style: '--card-bg: rgb(1, 2, 3); --card-fg: rgb(4, 5, 6);'
    }
  })
  const host = defaultPage.container as HTMLElement
  const card = defaultPage.container.querySelector('[data-slot="card"]') as HTMLElement
  const tokenCard = tokenPage.container.querySelector('[data-slot="card"]') as HTMLElement

  expect(getComputedStyle(card).getPropertyValue('--card-bg').trim()).toBe(
    getComputedStyle(card).getPropertyValue('--card').trim()
  )
  expect(getComputedStyle(tokenCard).backgroundColor).toBe('rgb(1, 2, 3)')

  host.dataset.theme = 'dark'
  expect(getComputedStyle(card).getPropertyValue('--card-bg').trim()).toBe('oklch(0.205 0 0)')
})

it('变体映射为每个公开槽位提供稳定类名', () => {
  const slots = cardVariants({ size: 'sm' })

  expect(slots.base()).toContain('card--sm')
  expect(slots.header()).toContain('card__header')
  expect(slots.title()).toContain('card__title')
  expect(slots.description()).toContain('card__description')
  expect(slots.action()).toContain('card__action')
  expect(slots.content()).toContain('card__content')
  expect(slots.footer()).toContain('card__footer')
})
