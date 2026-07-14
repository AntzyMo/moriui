import type { ColumnDef } from '@tanstack/vue-table'

import Table from '../src/components/table/Table.vue'
import { tableVariants } from '../src/components/table/variants'

import { expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import './style.css'

interface Person {
  id: string
  name: string
  team: string
}

const people: Person[] = Array.from({ length: 12 }, (_, index) => ({
  id: `person-${index + 1}`,
  name: index === 0 ? '周默' : `成员 ${String(index + 1).padStart(2, '0')}`,
  team: index % 2 === 0 ? '设计' : '工程'
}))

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: '姓名',
    cell: context => String(context.getValue()),
    meta: { filter: { placeholder: '筛选姓名' } }
  },
  {
    accessorKey: 'team',
    header: '团队',
    cell: context => String(context.getValue()),
    meta: { filter: { placeholder: '筛选团队' } }
  }
]

function createTable(options: {
  data?: Person[]
  props?: Record<string, unknown>
  slots?: Record<string, (context: { table: unknown }) => ReturnType<typeof h>>
} = {}) {
  return render(Table as any, {
    props: {
      columns,
      data: options.data ?? people,
      getRowId: (row: Person) => row.id,
      selectable: true,
      ...options.props
    },
    slots: options.slots
  })
}

async function inputValue(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  await nextTick()
}

it('渲染 TanStack 列定义、稳定槽位、横向滚动与默认分页', () => {
  const page = createTable()
  const table = page.container.querySelector('[data-slot="table"]') as HTMLElement
  const scrollContainer = page.container.querySelector('[data-slot="table-scroll-container"]') as HTMLElement

  expect(table.classList).toContain('table')
  expect(table.classList).toContain('table--default-size')
  expect(page.container.querySelector('[data-slot="table-content"]')?.tagName).toBe('TABLE')
  expect(page.container.querySelectorAll('[data-slot="table-body"] [data-slot="table-row"]')).toHaveLength(10)
  expect(page.container.textContent).toContain('周默')
  expect(getComputedStyle(scrollContainer).overflowX).toBe('auto')
  expect(page.container.querySelector('[data-slot="table-column-filter"]')).not.toBeNull()
  expect(page.container.querySelector('[data-slot="table-pagination-summary"]')?.textContent).toContain('12')
})

it('支持排序、全局搜索与列级文本筛选，并同步对应模型事件', async () => {
  const onSorting = vi.fn()
  const onGlobalFilter = vi.fn()
  const onColumnFilters = vi.fn()
  const page = createTable({
    props: {
      'onUpdate:sorting': onSorting,
      'onUpdate:globalFilter': onGlobalFilter,
      'onUpdate:columnFilters': onColumnFilters
    }
  })
  const sorter = page.container.querySelector('[data-slot="table-head"] button') as HTMLButtonElement
  const search = page.container.querySelector('[data-slot="table-search"]') as HTMLInputElement
  const nameFilter = page.container.querySelector('[placeholder="筛选姓名"]') as HTMLInputElement

  sorter.click()
  await nextTick()
  await nextTick()
  expect(onSorting).toHaveBeenCalledOnce()
  expect(sorter.getAttribute('aria-label')).toBe('按降序排序')

  await inputValue(search, '周默')
  expect(onGlobalFilter).toHaveBeenCalledWith('周默')
  expect(page.container.querySelectorAll('[data-slot="table-body"] [data-slot="table-row"]')).toHaveLength(1)

  await inputValue(search, '')
  await inputValue(nameFilter, '成员 02')
  expect(onColumnFilters).toHaveBeenCalled()
  expect(page.container.textContent).toContain('成员 02')
  expect(page.container.querySelectorAll('[data-slot="table-body"] [data-slot="table-row"]')).toHaveLength(1)
})

it('支持当前页多选、分页切换和页大小切换', async () => {
  const onSelection = vi.fn()
  const onPagination = vi.fn()
  const page = createTable({
    props: {
      'onUpdate:pagination': onPagination,
      'onUpdate:rowSelection': onSelection
    }
  })
  const controls = page.container.querySelectorAll('[data-slot="table-selection-control"]')
  const selectAll = controls[0] as HTMLInputElement
  const next = page.container.querySelector('[data-slot="pagination-next"]') as HTMLButtonElement
  const pageSize = page.container.querySelector('[data-slot="table-page-size"]') as HTMLSelectElement

  selectAll.click()
  await nextTick()
  expect(onSelection).toHaveBeenCalled()
  const selection = onSelection.mock.calls.at(-1)?.[0] as Record<string, boolean> | undefined
  expect(selection?.['person-1']).toBe(true)

  next.click()
  await nextTick()
  await nextTick()
  expect(onPagination).toHaveBeenCalled()
  expect(page.container.textContent).toContain('成员 11')

  pageSize.value = '20'
  pageSize.dispatchEvent(new Event('change', { bubbles: true }))
  await nextTick()
  await nextTick()
  expect(page.container.querySelectorAll('[data-slot="table-body"] [data-slot="table-row"]')).toHaveLength(12)
})

it('支持受控状态、工具栏和分页插槽替换', async () => {
  const sorting = shallowRef([])
  const Fixture = defineComponent({
    setup: () => () => h(Table as any, {
      columns,
      'data': people,
      'getRowId': (row: Person) => row.id,
      'onUpdate:sorting': (value: unknown) => {
        sorting.value = value as never[]
      },
      'sorting': sorting.value
    }, {
      toolbar: () => h('span', { 'data-testid': 'custom-toolbar' }, '自定义工具栏'),
      pagination: () => h('span', { 'data-testid': 'custom-pagination' }, '自定义分页')
    })
  })
  const page = render(Fixture)

  expect(page.container.querySelector('[data-testid="custom-toolbar"]')?.textContent).toBe('自定义工具栏')
  expect(page.container.querySelector('[data-testid="custom-pagination"]')?.textContent).toBe('自定义分页')
  expect(page.container.querySelector('[data-slot="pagination-next"]')).toBeNull()

  ;(page.container.querySelector('[data-slot="table-head"] button') as HTMLButtonElement).click()
  await nextTick()
  expect(sorting.value).toHaveLength(1)
})

it('在空数据时渲染默认或自定义空状态', () => {
  const defaultPage = createTable({ data: [] })
  const customPage = createTable({
    data: [],
    slots: {
      empty: () => h('strong', { 'data-testid': 'custom-empty' }, '自定义空状态')
    }
  })

  expect(defaultPage.container.querySelector('[data-slot="table-empty"]')?.textContent).toContain('没有结果')
  expect(customPage.container.querySelector('[data-testid="custom-empty"]')?.textContent).toBe('自定义空状态')
})

it('在替换 data 引用后更新行模型', async () => {
  const data = shallowRef<Person[]>(people.slice(0, 2))
  const Fixture = defineComponent({
    setup: () => () => h(Table as any, {
      columns,
      data: data.value,
      getRowId: (row: Person) => row.id
    })
  })
  const page = render(Fixture)

  expect(page.container.querySelectorAll('[data-slot="table-body"] [data-slot="table-row"]')).toHaveLength(2)
  data.value = [people[2]]
  await nextTick()
  await nextTick()

  expect(page.container.querySelectorAll('[data-slot="table-body"] [data-slot="table-row"]')).toHaveLength(1)
  expect(page.container.textContent).toContain('成员 03')
})

it('变体映射覆盖公开槽位与紧凑密度', () => {
  const slots = tableVariants({ size: 'sm' })
  const page = createTable({ props: { size: 'sm' } })
  const table = page.container.querySelector('[data-slot="table"]') as HTMLElement

  expect(slots.base()).toContain('table--sm')
  expect(slots.toolbar()).toContain('table__toolbar')
  expect(slots.content()).toContain('table__content')
  expect(slots.pagination()).toContain('table__pagination')
  expect(table.dataset.size).toBe('sm')
  expect(getComputedStyle(table).getPropertyValue('--table-head-height').trim()).toBe('2rem')
})
