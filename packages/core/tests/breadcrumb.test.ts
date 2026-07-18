import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Breadcrumb from '../src/components/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '../src/components/breadcrumb/BreadcrumbItem.vue'
import BreadcrumbLink from '../src/components/breadcrumb/BreadcrumbLink.vue'
import BreadcrumbList from '../src/components/breadcrumb/BreadcrumbList.vue'
import BreadcrumbPage from '../src/components/breadcrumb/BreadcrumbPage.vue'
import BreadcrumbEllipsis from '../src/components/breadcrumb/BreadcrumbEllipsis.vue'
import BreadcrumbSeparator from '../src/components/breadcrumb/BreadcrumbSeparator.vue'

import './style.css'

it('渲染完整的路径语义结构，并保留根节点属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Breadcrumb,
        {
          'class': 'custom-breadcrumb',
          'data-testid': 'project-path',
          onClick
        },
        {
          default: () =>
            h(
              BreadcrumbList,
              {},
              {
                default: () => [
                  h(
                    BreadcrumbItem,
                    {},
                    {
                      default: () =>
                        h(BreadcrumbLink, { href: '#home' }, { default: () => '首页' })
                    }
                  ),
                  h(BreadcrumbSeparator),
                  h(
                    BreadcrumbItem,
                    {},
                    { default: () => h(BreadcrumbPage, {}, { default: () => '组件' }) }
                  )
                ]
              }
            )
        }
      )
  })
  const page = render(Fixture)
  const breadcrumb = page.container.querySelector('[data-slot="breadcrumb"]') as HTMLElement
  const list = page.container.querySelector('[data-slot="breadcrumb-list"]')
  const items = page.container.querySelectorAll('[data-slot="breadcrumb-item"]')
  const link = page.container.querySelector('[data-slot="breadcrumb-link"]') as HTMLAnchorElement
  const currentPage = page.container.querySelector('[data-slot="breadcrumb-page"]') as HTMLElement

  expect(breadcrumb.tagName).toBe('NAV')
  expect(breadcrumb.getAttribute('aria-label')).toBe('breadcrumb')
  expect(breadcrumb.classList).toContain('breadcrumb')
  expect(breadcrumb.classList).toContain('custom-breadcrumb')
  expect(breadcrumb.dataset.testid).toBe('project-path')
  expect(list?.tagName).toBe('OL')
  expect(items).toHaveLength(2)
  expect(link.tagName).toBe('A')
  expect(link.getAttribute('href')).toBe('#home')
  expect(currentPage.getAttribute('role')).toBe('link')
  expect(currentPage.getAttribute('aria-disabled')).toBe('true')
  expect(currentPage.getAttribute('aria-current')).toBe('page')

  breadcrumb.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('breadcrumbLink 支持原生属性透传、as 与 asChild 多态渲染', () => {
  const defaultPage = render(BreadcrumbLink, {
    attrs: { 'href': '#overview', 'aria-label': '查看概览' },
    props: { class: 'custom-link' },
    slots: { default: '概览' }
  })
  const defaultLink = defaultPage.container.querySelector('a') as HTMLAnchorElement

  expect(defaultLink.dataset.slot).toBe('breadcrumb-link')
  expect(defaultLink.classList).toContain('breadcrumb__link')
  expect(defaultLink.classList).toContain('custom-link')
  expect(defaultLink.getAttribute('href')).toBe('#overview')
  expect(defaultLink.getAttribute('aria-label')).toBe('查看概览')

  const asButton = render(BreadcrumbLink, {
    attrs: { type: 'button' },
    props: { as: 'button' },
    slots: { default: '打开概览' }
  })
  expect(asButton.container.querySelector('button')?.getAttribute('type')).toBe('button')

  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        BreadcrumbLink,
        { asChild: true },
        {
          default: () => h('a', { href: '#next' }, '下一页')
        }
      )
  })
  const asChild = render(AsChildFixture)
  const childLink = asChild.container.querySelector('a') as HTMLAnchorElement

  expect(childLink.dataset.slot).toBe('breadcrumb-link')
  expect(childLink.classList).toContain('breadcrumb__link')
  expect(childLink.getAttribute('href')).toBe('#next')
})

it('分隔符与省略提示提供可替换的默认内容和隐藏语义', () => {
  const defaultSeparator = render(BreadcrumbSeparator)
  const separator = defaultSeparator.container.querySelector(
    '[data-slot="breadcrumb-separator"]'
  ) as HTMLElement
  const defaultEllipsis = render(BreadcrumbEllipsis)
  const ellipsis = defaultEllipsis.container.querySelector(
    '[data-slot="breadcrumb-ellipsis"]'
  ) as HTMLElement

  expect(separator.tagName).toBe('LI')
  expect(separator.getAttribute('role')).toBe('presentation')
  expect(separator.getAttribute('aria-hidden')).toBe('true')
  expect(separator.querySelector('svg')).not.toBeNull()
  expect(ellipsis.getAttribute('role')).toBe('presentation')
  expect(ellipsis.getAttribute('aria-hidden')).toBe('true')
  expect(ellipsis.querySelector('svg')).not.toBeNull()

  const CustomFixture = defineComponent({
    setup: () => () => [
      h(
        BreadcrumbSeparator,
        {},
        { default: () => h('span', { 'data-testid': 'custom-separator' }, '/') }
      ),
      h(
        BreadcrumbEllipsis,
        {},
        { default: () => h('span', { 'data-testid': 'custom-ellipsis' }, '…') }
      )
    ]
  })
  const custom = render(CustomFixture)

  expect(custom.container.querySelector('[data-testid="custom-separator"]')?.textContent).toBe('/')
  expect(custom.container.querySelector('[data-testid="custom-ellipsis"]')?.textContent).toBe('…')
})

it('链接可获得浏览器焦点状态，并由语义 Token 适配亮暗主题', () => {
  const page = render(Breadcrumb, {
    slots: {
      default: () =>
        h(
          BreadcrumbList,
          {},
          {
            default: () =>
              h(
                BreadcrumbItem,
                {},
                {
                  default: () =>
                    h(BreadcrumbLink, { href: '#settings' }, { default: () => '设置' })
                }
              )
          }
        )
    }
  })
  const host = page.container as HTMLElement
  const breadcrumb = page.container.querySelector('[data-slot="breadcrumb"]') as HTMLElement
  const link = page.container.querySelector('[data-slot="breadcrumb-link"]') as HTMLAnchorElement
  const list = page.container.querySelector('[data-slot="breadcrumb-list"]') as HTMLElement

  link.focus()

  expect(document.activeElement).toBe(link)
  expect(link.matches(':focus-visible')).toBe(true)
  expect(getComputedStyle(list).flexWrap).toBe('wrap')
  expect(getComputedStyle(breadcrumb).getPropertyValue('--breadcrumb-fg').trim()).toBe(
    getComputedStyle(breadcrumb).getPropertyValue('--muted-foreground').trim()
  )

  host.dataset.theme = 'dark'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
  host.dataset.theme = 'light'
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(1 0 0)')
})
