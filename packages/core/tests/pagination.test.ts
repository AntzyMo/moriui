import { expect, it, vi } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

import Pagination from '../src/components/pagination/Pagination.vue'
import PaginationItem from '../src/components/pagination/PaginationItem.vue'
import PaginationLast from '../src/components/pagination/PaginationLast.vue'
import PaginationList from '../src/components/pagination/PaginationList.vue'
import PaginationNext from '../src/components/pagination/PaginationNext.vue'
import PaginationPrev from '../src/components/pagination/PaginationPrev.vue'
import PaginationFirst from '../src/components/pagination/PaginationFirst.vue'
import PaginationEllipsis from '../src/components/pagination/PaginationEllipsis.vue'

import './style.css'

interface PaginationOptions {
  itemSlot?: (value: number) => ReturnType<typeof h>
  paginationProps?: Record<string, unknown>
}

function createPagination(options: PaginationOptions = {}) {
  return defineComponent({
    setup: () => () =>
      h(
        Pagination,
        {
          itemsPerPage: 10,
          total: 100,
          ...options.paginationProps
        },
        {
          default: () =>
            h(
              PaginationList,
              {},
              {
                default: ({ items }) => [
                  h(PaginationFirst),
                  h(PaginationPrev),
                  ...items.map((item, index) =>
                    item.type === 'page'
                      ? h(
                          PaginationItem,
                          { key: `page-${item.value}`, value: item.value },
                          {
                            default: () => options.itemSlot?.(item.value) ?? item.value
                          }
                        )
                      : h(PaginationEllipsis, { key: `ellipsis-${index}` })
                  ),
                  h(PaginationNext),
                  h(PaginationLast)
                ]
              }
            )
        }
      )
  })
}

function getPageButton(container: HTMLElement, value: number) {
  return container.querySelector(
    `[data-slot="pagination-item"][aria-label="Page ${value}"]`
  ) as HTMLButtonElement
}

it('渲染八个稳定槽位、默认图标，并保留调用方属性与类名', () => {
  const onClick = vi.fn()
  const page = render(
    createPagination({
      paginationProps: {
        'class': 'custom-pagination',
        'data-testid': 'orders-pagination',
        'showEdges': true,
        onClick
      }
    })
  )
  const pagination = page.container.querySelector('[data-slot="pagination"]') as HTMLElement
  const list = page.container.querySelector('[data-slot="pagination-list"]') as HTMLElement

  expect(pagination.tagName).toBe('NAV')
  expect(pagination.classList).toContain('pagination')
  expect(pagination.classList).toContain('custom-pagination')
  expect(pagination.dataset.testid).toBe('orders-pagination')
  expect(list.classList).toContain('pagination__list')
  expect(page.container.querySelector('[data-slot="pagination-first"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-prev"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-item"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-ellipsis"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-next"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-last"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-first-icon"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-prev-icon"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-next-icon"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-last-icon"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="pagination-ellipsis-icon"]')).not.toBeNull()

  pagination.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('支持非受控默认页，并在点击页码和导航按钮后同步 Reka 选择状态', async () => {
  const page = render(createPagination({ paginationProps: { defaultPage: 2 } }))
  const container = page.container

  expect(getPageButton(container, 2).dataset.selected).toBe('true')
  expect(getPageButton(container, 2).getAttribute('aria-current')).toBe('page')

  getPageButton(container, 3).click()
  await nextTick()
  expect(getPageButton(container, 3).dataset.selected).toBe('true');

  (container.querySelector('[data-slot="pagination-next"]') as HTMLButtonElement).click()
  await nextTick()
  expect(getPageButton(container, 4).dataset.selected).toBe('true');

  (container.querySelector('[data-slot="pagination-last"]') as HTMLButtonElement).click()
  await nextTick()
  expect(
    (
      container.querySelector('[data-slot="pagination-item"][data-selected="true"]') as HTMLElement
    ).getAttribute('aria-label')
  ).toBe('Page 10');

  (container.querySelector('[data-slot="pagination-first"]') as HTMLButtonElement).click()
  await nextTick()
  expect(getPageButton(container, 1).dataset.selected).toBe('true')
})

it('通过 v-model:page 对外同步受控页码，并完整透传根作用域插槽参数', async () => {
  const model = ref(2)
  const received = ref('')
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Pagination,
        {
          'itemsPerPage': 10,
          'page': model.value,
          'total': 100,
          'onUpdate:page': (value: number) => {
            model.value = value
          }
        },
        {
          default: ({ page, pageCount }) => {
            received.value = `${page}/${pageCount}`
            return h(
              PaginationList,
              {},
              {
                default: ({ items }) => [
                  h(PaginationPrev),
                  ...items.map(item =>
                    item.type === 'page'
                      ? h(PaginationItem, { key: item.value, value: item.value })
                      : h(PaginationEllipsis)
                  ),
                  h(PaginationNext)
                ]
              }
            )
          }
        }
      )
  })
  const page = render(Fixture)
  const container = page.container

  expect(received.value).toBe('2/10');
  (container.querySelector('[data-slot="pagination-next"]') as HTMLButtonElement).click()
  await nextTick()
  expect(model.value).toBe(3)
  expect(received.value).toBe('3/10')
  expect(getPageButton(container, 3).dataset.selected).toBe('true')
})

it('按照 showEdges 与 siblingCount 生成页码范围和省略号', () => {
  const page = render(
    createPagination({
      paginationProps: { defaultPage: 5, showEdges: true, siblingCount: 1 }
    })
  )
  const values = Array.from(page.container.querySelectorAll('[data-slot="pagination-item"]')).map(
    item => item.getAttribute('aria-label')
  )

  expect(values).toEqual(['Page 1', 'Page 4', 'Page 5', 'Page 6', 'Page 10'])
  expect(page.container.querySelectorAll('[data-slot="pagination-ellipsis"]')).toHaveLength(2)
})

it('在边界、零数据和根级禁用时禁用相应导航与页码操作', async () => {
  const boundary = render(createPagination())
  const boundaryContainer = boundary.container

  expect(
    (boundaryContainer.querySelector('[data-slot="pagination-first"]') as HTMLButtonElement)
      .disabled
  ).toBe(true)
  expect(
    (boundaryContainer.querySelector('[data-slot="pagination-prev"]') as HTMLButtonElement)
      .disabled
  ).toBe(true)

  const empty = render(createPagination({ paginationProps: { total: 0 } }))
  const emptyContainer = empty.container
  for (const slot of [
    'pagination-first',
    'pagination-prev',
    'pagination-next',
    'pagination-last'
  ]) {
    expect(
      (emptyContainer.querySelector(`[data-slot="${slot}"]`) as HTMLButtonElement).disabled
    ).toBe(true)
  }

  const disabled = render(
    createPagination({ paginationProps: { defaultPage: 2, disabled: true } })
  )
  const disabledContainer = disabled.container
  const selected = getPageButton(disabledContainer, 2)
  const target = getPageButton(disabledContainer, 3)

  expect(selected.disabled).toBe(true)
  expect(target.disabled).toBe(true)
  target.click()
  await nextTick()
  expect(selected.dataset.selected).toBe('true')
})

it('支持调用方替换默认内容，以及 as 和 asChild 多态渲染', () => {
  const custom = render(
    createPagination({
      itemSlot: value => h('span', { 'data-testid': `page-${value}` }, `第 ${value} 页`)
    })
  )
  expect(custom.container.querySelector('[data-testid="page-1"]')?.textContent).toBe('第 1 页')

  const PolymorphicFixture = defineComponent({
    setup: () => () =>
      h(
        Pagination,
        { itemsPerPage: 10, total: 100 },
        {
          default: () =>
            h(
              PaginationList,
              {},
              {
                default: () => [
                  h(
                    PaginationPrev,
                    { asChild: true },
                    {
                      default: () => h('a', { href: '#previous' }, '上一页')
                    }
                  ),
                  h(PaginationItem, { as: 'a', href: '#third', value: 3 }, { default: () => '3' })
                ]
              }
            )
        }
      )
  })
  const polymorphic = render(PolymorphicFixture)
  const previous = polymorphic.container.querySelector('a[href="#previous"]') as HTMLAnchorElement
  const item = polymorphic.container.querySelector('a[href="#third"]') as HTMLAnchorElement

  expect(previous.classList).toContain('pagination__prev')
  expect(previous.getAttribute('aria-label')).toBe('Previous Page')
  expect(item.classList).toContain('pagination__item')
  expect(item.getAttribute('aria-label')).toBe('Page 3')
})

it('在亮暗主题下保留 Nova Token、紧凑尺寸与可见焦点样式', () => {
  const page = render(createPagination())
  const pagination = page.container.querySelector('[data-slot="pagination"]') as HTMLElement
  const item = getPageButton(page.container, 1)

  expect(getComputedStyle(item).width).toBe('32px')
  item.focus()
  expect(getComputedStyle(item).boxShadow).not.toBe('none')

  pagination.dataset.theme = 'dark'
  expect(getComputedStyle(pagination).getPropertyValue('--background').trim()).toBe(
    'oklch(0.145 0 0)'
  )
})
