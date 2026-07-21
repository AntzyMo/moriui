<script setup lang="ts">
  import type { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from 'moriui'

  import { ref } from 'vue'
  import { Table } from 'moriui'

  interface Invoice {
    invoice: string
    status: string
    email: string
    amount: number
  }

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'invoice',
      header: '发票号',
      meta: { filter: { placeholder: '筛选发票' } }
    },
    {
      accessorKey: 'status',
      header: '状态',
      cell: ctx => String(ctx.getValue()),
      meta: { filter: { placeholder: '筛选状态' } }
    },
    {
      accessorKey: 'email',
      header: '邮箱',
      cell: ctx => String(ctx.getValue()),
      meta: { filter: { placeholder: '筛选邮箱' } }
    },
    {
      accessorKey: 'amount',
      header: '金额',
      cell: ctx => `¥${(ctx.getValue() as number).toLocaleString()}`
    }
  ]

  const data: Invoice[] = [
    { invoice: 'INV-001', status: '已支付', email: 'ken@example.com', amount: 316 },
    { invoice: 'INV-002', status: '已支付', email: 'abe@example.com', amount: 242 },
    { invoice: 'INV-003', status: '处理中', email: 'monserrat@example.com', amount: 837 },
    { invoice: 'INV-004', status: '已支付', email: 'silas@example.com', amount: 874 },
    { invoice: 'INV-005', status: '失败', email: 'carmella@example.com', amount: 721 },
    { invoice: 'INV-006', status: '待处理', email: 'jane@example.com', amount: 150 },
    { invoice: 'INV-007', status: '已支付', email: 'bob@example.com', amount: 450 },
    { invoice: 'INV-008', status: '处理中', email: 'alice@example.com', amount: 680 },
    { invoice: 'INV-009', status: '失败', email: 'tim@example.com', amount: 325 },
    { invoice: 'INV-010', status: '已支付', email: 'lisa@example.com', amount: 960 },
    { invoice: 'INV-011', status: '待处理', email: 'tom@example.com', amount: 180 },
    { invoice: 'INV-012', status: '已支付', email: 'ann@example.com', amount: 540 },
    { invoice: 'INV-013', status: '失败', email: 'max@example.com', amount: 410 },
    { invoice: 'INV-014', status: '处理中', email: 'lucy@example.com', amount: 775 },
    { invoice: 'INV-015', status: '已支付', email: 'sam@example.com', amount: 633 }
  ]

  const sorting = ref<SortingState>([])
  const columnFilters = ref<ColumnFiltersState>([])
  const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 5 })
</script>

<template>
  <Table
    v-model:sorting="sorting"
    v-model:column-filters="columnFilters"
    v-model:pagination="pagination"
    :data="data"
    :columns="columns"
  />
</template>
