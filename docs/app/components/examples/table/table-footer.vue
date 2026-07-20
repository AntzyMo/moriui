<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table } from 'moriui'
import type { ColumnDef, PaginationState, SortingState } from 'moriui'

interface Invoice {
  invoice: string
  status: string
  amount: number
}

const columns: ColumnDef<Invoice>[] = [
  { accessorKey: 'invoice', header: '发票号', cell: ctx => String(ctx.getValue()) },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ctx => String(ctx.getValue())
  },
  {
    accessorKey: 'amount',
    header: '金额',
    cell: ctx => `¥${(ctx.getValue() as number).toFixed(2)}`
  }
]

const data: Invoice[] = [
  { invoice: 'INV-001', status: '已支付', amount: 250 },
  { invoice: 'INV-002', status: '待支付', amount: 150 },
  { invoice: 'INV-003', status: '未支付', amount: 350 },
  { invoice: 'INV-004', status: '已支付', amount: 450 },
  { invoice: 'INV-005', status: '已支付', amount: 550 },
  { invoice: 'INV-006', status: '待支付', amount: 200 },
  { invoice: 'INV-007', status: '未支付', amount: 300 }
]

const sorting = ref<SortingState>([])
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 5 })

const filteredTotal = computed(() =>
  data.reduce((sum, inv) => sum + inv.amount, 0)
)
</script>
<template>
  <Table
    v-model:sorting="sorting"
    v-model:pagination="pagination"
    :data="data"
    :columns="columns"
    class="max-w-lg"
  >
    <template #pagination="{ table }">
      <div class="flex w-full items-center justify-between px-4 py-3 text-sm">
        <span class="text-muted-foreground">
          合计：<strong class="text-foreground">¥{{ filteredTotal.toFixed(2) }}</strong>
        </span>
        <span class="text-muted-foreground">
          共 {{ table.getFilteredRowModel().rows.length }} 条
        </span>
      </div>
    </template>
  </Table>
</template>
