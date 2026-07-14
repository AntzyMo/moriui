import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Empty from '../src/components/empty/Empty.vue'
import EmptyMedia from '../src/components/empty/EmptyMedia.vue'
import EmptyTitle from '../src/components/empty/EmptyTitle.vue'
import { emptyVariants } from '../src/components/empty/variants'
import EmptyHeader from '../src/components/empty/EmptyHeader.vue'
import EmptyContent from '../src/components/empty/EmptyContent.vue'
import EmptyDescription from '../src/components/empty/EmptyDescription.vue'

import './style.css'

it('默认渲染空状态容器，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Empty, {
    attrs: {
      'aria-label': '项目为空',
      'data-testid': 'project-empty',
      onClick
    },
    props: {
      class: 'custom-empty'
    },
    slots: {
      default: '暂无项目'
    }
  })
  const empty = page.container.querySelector('[data-slot="empty"]') as HTMLElement

  expect(empty.tagName).toBe('DIV')
  expect(empty.classList).toContain('empty')
  expect(empty.classList).toContain('custom-empty')
  expect(empty.getAttribute('aria-label')).toBe('项目为空')
  expect(empty.dataset.testid).toBe('project-empty')

  empty.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('渲染完整组合槽位及其稳定类名', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Empty, {}, {
      default: () => [
        h(EmptyHeader, {}, {
          default: () => [
            h(EmptyMedia, { variant: 'icon' }, {
              default: () => h('svg', { 'viewBox': '0 0 24 24', 'aria-hidden': 'true' })
            }),
            h(EmptyTitle, {}, { default: () => '暂无项目' }),
            h(EmptyDescription, {}, {
              default: () => [
                '创建你的第一个项目，或',
                h('a', { href: '#import' }, '导入已有项目')
              ]
            })
          ]
        }),
        h(EmptyContent, {}, { default: () => h('button', { type: 'button' }, '创建项目') })
      ]
    })
  })
  const page = render(Fixture)
  const empty = page.container.querySelector('[data-slot="empty"]') as HTMLElement
  const header = page.container.querySelector('[data-slot="empty-header"]') as HTMLElement
  const media = page.container.querySelector('[data-slot="empty-icon"]') as HTMLElement
  const title = page.container.querySelector('[data-slot="empty-title"]') as HTMLElement
  const description = page.container.querySelector('[data-slot="empty-description"]') as HTMLElement
  const content = page.container.querySelector('[data-slot="empty-content"]') as HTMLElement

  expect(header.classList).toContain('empty__header')
  expect(media.classList).toContain('empty__media')
  expect(title.classList).toContain('empty__title')
  expect(description.tagName).toBe('P')
  expect(description.classList).toContain('empty__description')
  expect(content.classList).toContain('empty__content')
  expect(getComputedStyle(empty).gap).toBe('16px')
  expect(getComputedStyle(header).gap).toBe('8px')
  expect(getComputedStyle(content).gap).toBe('10px')
})

it.each(['default', 'icon'] as const)('应用 %s 媒体变体及数据属性', variant => {
  const page = render(EmptyMedia, {
    props: { variant },
    slots: {
      default: () => h('svg', { viewBox: '0 0 24 24' })
    }
  })
  const media = page.container.querySelector('[data-slot="empty-icon"]') as HTMLElement

  expect(media.dataset.variant).toBe(variant)
  expect(media.classList).toContain(`empty__media--${variant}`)
  expect(media.classList).toContain('empty__media')

  if (variant === 'icon') {
    const icon = media.querySelector('svg') as SVGElement
    expect(getComputedStyle(media).width).toBe('32px')
    expect(getComputedStyle(media).height).toBe('32px')
    expect(getComputedStyle(media).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(getComputedStyle(icon).width).toBe('16px')
    expect(getComputedStyle(icon).pointerEvents).toBe('none')
  }
})

it('描述链接、局部 Token 与主题切换按 Nova 语义生效', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Empty, {
      style: '--empty-fg: rgb(1, 2, 3); --empty-description-fg: rgb(4, 5, 6);'
    }, {
      default: () => h(EmptyDescription, {}, {
        default: () => h('a', { href: '#help' }, '查看帮助')
      })
    })
  })
  const page = render(Fixture)
  const host = page.container as HTMLElement
  const empty = page.container.querySelector('[data-slot="empty"]') as HTMLElement
  const description = page.container.querySelector('[data-slot="empty-description"]') as HTMLElement
  const link = description.querySelector('a') as HTMLAnchorElement

  expect(getComputedStyle(empty).color).toBe('rgb(1, 2, 3)')
  expect(getComputedStyle(description).color).toBe('rgb(4, 5, 6)')
  expect(getComputedStyle(link).textDecorationLine).toContain('underline')
  expect(getComputedStyle(host).getPropertyValue('--muted').trim()).toBe('oklch(0.97 0 0)')

  host.dataset.theme = 'dark'
  expect(getComputedStyle(host).getPropertyValue('--muted').trim()).toBe('oklch(0.269 0 0)')
})

it('变体映射为每个公开槽位提供稳定类名', () => {
  const slots = emptyVariants({ variant: 'icon' })

  expect(slots.base()).toContain('empty')
  expect(slots.header()).toContain('empty__header')
  expect(slots.media()).toContain('empty__media')
  expect(slots.media()).toContain('empty__media--icon')
  expect(slots.title()).toContain('empty__title')
  expect(slots.description()).toContain('empty__description')
  expect(slots.content()).toContain('empty__content')
})
