import { expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Item from '../src/components/item/Item.vue'
import ItemMedia from '../src/components/item/ItemMedia.vue'
import ItemTitle from '../src/components/item/ItemTitle.vue'
import ItemGroup from '../src/components/item/ItemGroup.vue'
import ItemFooter from '../src/components/item/ItemFooter.vue'
import ItemHeader from '../src/components/item/ItemHeader.vue'
import { itemVariants } from '../src/components/item/variants'
import ItemActions from '../src/components/item/ItemActions.vue'
import ItemContent from '../src/components/item/ItemContent.vue'
import ItemSeparator from '../src/components/item/ItemSeparator.vue'
import ItemDescription from '../src/components/item/ItemDescription.vue'

import './style.css'

it('默认渲染 Item，并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Item, {
    attrs: {
      'aria-label': '账户安全',
      'data-testid': 'account-security',
      onClick
    },
    props: { class: 'custom-item' },
    slots: { default: '账户安全' }
  })
  const item = page.container.querySelector('[data-slot="item"]') as HTMLElement

  expect(item.tagName).toBe('DIV')
  expect(item.dataset.variant).toBe('default')
  expect(item.dataset.size).toBe('default')
  expect(item.classList).toContain('item')
  expect(item.classList).toContain('item--default')
  expect(item.classList).toContain('item--default-size')
  expect(item.classList).toContain('custom-item')
  expect(item.getAttribute('aria-label')).toBe('账户安全')
  expect(item.dataset.testid).toBe('account-security')

  item.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('支持 as 与 asChild 多态渲染，并将样式合并到最终元素', () => {
  const anchorPage = render(Item, {
    attrs: { href: '#settings' },
    props: { as: 'a', size: 'sm', variant: 'outline' }
  })
  const anchor = anchorPage.container.querySelector('[data-slot="item"]') as HTMLAnchorElement

  expect(anchor.tagName).toBe('A')
  expect(anchor.getAttribute('href')).toBe('#settings')
  expect(anchor.classList).toContain('item--sm')
  expect(anchor.classList).toContain('item--outline')

  const Fixture = defineComponent({
    setup: () => () => h(Item, { asChild: true, variant: 'muted' }, {
      default: () => h('a', { href: '#dashboard' }, '仪表盘')
    })
  })
  const page = render(Fixture)
  const childAnchor = page.container.querySelector('a') as HTMLAnchorElement

  expect(childAnchor.dataset.slot).toBe('item')
  expect(childAnchor.dataset.variant).toBe('muted')
  expect(childAnchor.classList).toContain('item')
  expect(childAnchor.getAttribute('href')).toBe('#dashboard')
})

it.each([
  ['default', 'default'],
  ['outline', 'sm'],
  ['muted', 'xs']
] as const)('应用 %s 视觉和 %s 密度变体', (variant, size) => {
  const page = render(Item, { props: { variant, size } })
  const item = page.container.querySelector('[data-slot="item"]') as HTMLElement

  expect(item.dataset.variant).toBe(variant)
  expect(item.dataset.size).toBe(size)
  expect(item.classList).toContain(`item--${variant}`)
  expect(item.classList).toContain(size === 'default' ? 'item--default-size' : `item--${size}`)
})

it('渲染完整组合槽位、媒体变体、分组与水平分隔线', () => {
  const Fixture = defineComponent({
    setup: () => () => h(ItemGroup, {}, {
      default: () => [
        h(Item, { size: 'xs' }, {
          default: () => [
            h(ItemMedia, { variant: 'image' }, { default: () => h('img', { alt: '项目预览', src: '/project.png' }) }),
            h(ItemContent, {}, {
              default: () => [
                h(ItemHeader, {}, { default: () => h(ItemTitle, {}, { default: () => '项目概览' }) }),
                h(ItemDescription, {}, { default: () => h('a', { href: '#details' }, '查看项目详情。') }),
                h(ItemFooter, {}, { default: () => '刚刚更新' })
              ]
            }),
            h(ItemActions, {}, { default: () => h('button', { type: 'button' }, '打开') })
          ]
        }),
        h(ItemSeparator)
      ]
    })
  })
  const page = render(Fixture)
  const group = page.container.querySelector('[data-slot="item-group"]') as HTMLElement
  const media = page.container.querySelector('[data-slot="item-media"]') as HTMLElement
  const separator = page.container.querySelector('[data-slot="item-separator"]') as HTMLElement

  expect(group.getAttribute('role')).toBe('list')
  expect(group.classList).toContain('item-group')
  expect(media.dataset.variant).toBe('image')
  expect(media.classList).toContain('item__media--image')
  expect(page.container.querySelector('[data-slot="item-content"]')?.classList).toContain('item__content')
  expect(page.container.querySelector('[data-slot="item-title"]')?.classList).toContain('item__title')
  expect(page.container.querySelector('[data-slot="item-description"]')?.classList).toContain('item__description')
  expect(page.container.querySelector('[data-slot="item-actions"]')?.classList).toContain('item__actions')
  expect(page.container.querySelector('[data-slot="item-header"]')?.classList).toContain('item__header')
  expect(page.container.querySelector('[data-slot="item-footer"]')?.classList).toContain('item__footer')
  expect(separator.getAttribute('role')).toBe('separator')
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal')
  expect(getComputedStyle(separator).height).toBe('1px')
  expect(getComputedStyle(group).gap).toBe('8px')
})

it.each(['default', 'icon', 'image'] as const)('应用 %s 媒体变体', variant => {
  const page = render(ItemMedia, {
    props: { variant },
    slots: {
      default: () => variant === 'image'
        ? h('img', { alt: '预览', src: '/preview.png' })
        : h('svg', { viewBox: '0 0 24 24' })
    }
  })
  const media = page.container.querySelector('[data-slot="item-media"]') as HTMLElement

  expect(media.dataset.variant).toBe(variant)
  expect(media.classList).toContain(`item__media--${variant}`)

  if (variant === 'icon') {
    expect(getComputedStyle(media.querySelector('svg') as SVGElement).width).toBe('16px')
  }

  if (variant === 'image') {
    expect(getComputedStyle(media).width).toBe('40px')
    expect(getComputedStyle(media.querySelector('img') as HTMLImageElement).objectFit).toBe('cover')
  }
})

it('消费局部 Token，支持描述媒体布局、焦点环、链接样式和主题切换', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Item, {
      tabindex: 0,
      style: '--item-bg: rgb(1, 2, 3); --item-description-fg: rgb(4, 5, 6);'
    }, {
      default: () => [
        h(ItemMedia, { variant: 'icon' }, { default: () => h('svg', { viewBox: '0 0 24 24' }) }),
        h(ItemContent, {}, {
          default: () => [
            h(ItemTitle, {}, { default: () => '账户安全' }),
            h(ItemDescription, {}, { default: () => h('a', { href: '#help' }, '查看安全帮助。') })
          ]
        })
      ]
    })
  })
  const page = render(Fixture)
  const host = page.container as HTMLElement
  const item = page.container.querySelector('[data-slot="item"]') as HTMLElement
  const media = page.container.querySelector('[data-slot="item-media"]') as HTMLElement
  const description = page.container.querySelector('[data-slot="item-description"]') as HTMLElement
  const link = description.querySelector('a') as HTMLAnchorElement

  expect(getComputedStyle(item).backgroundColor).toBe('rgb(1, 2, 3)')
  expect(getComputedStyle(description).color).toBe('rgb(4, 5, 6)')
  expect(getComputedStyle(media).alignSelf).toBe('flex-start')
  expect(getComputedStyle(media).transform).toBe('matrix(1, 0, 0, 1, 0, 2)')
  expect(getComputedStyle(link).textDecorationLine).toContain('underline')

  item.focus()
  expect(item.matches(':focus-visible')).toBe(true)
  expect(getComputedStyle(item).getPropertyValue('--item-ring').trim()).toBe(
    getComputedStyle(item).getPropertyValue('--ring').trim()
  )

  host.dataset.theme = 'dark'
  expect(getComputedStyle(item).getPropertyValue('--item-hover-bg').trim()).toBe('oklch(0.269 0 0)')
})

it('变体映射为根和所有子槽位提供稳定类名', () => {
  const slots = itemVariants({ variant: 'outline', size: 'xs', mediaVariant: 'image' })

  expect(slots.base()).toContain('item')
  expect(slots.base()).toContain('item--outline')
  expect(slots.base()).toContain('item--xs')
  expect(slots.group()).toContain('item-group')
  expect(slots.media()).toContain('item__media--image')
  expect(slots.content()).toContain('item__content')
  expect(slots.title()).toContain('item__title')
  expect(slots.description()).toContain('item__description')
  expect(slots.actions()).toContain('item__actions')
  expect(slots.header()).toContain('item__header')
  expect(slots.footer()).toContain('item__footer')
  expect(slots.separator()).toContain('item__separator')
})
