<script setup lang="ts">
import { ref } from 'vue'
import { DirectionProvider, Table } from 'moriui'
import type { ColumnDef, PaginationState, SortingState } from 'moriui'

interface Invoice {
  invoice: string
  status: string
  amount: number
}

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'invoice',
    header: 'رقم الفاتورة',
    cell: ctx => String(ctx.getValue())
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ctx => String(ctx.getValue())
  },
  {
    accessorKey: 'amount',
    header: 'المبلغ',
    cell: ctx => `$${(ctx.getValue() as number).toLocaleString()}`
  }
]

const data: Invoice[] = [
  { invoice: 'INV-001', status: 'مدفوع', amount: 316 },
  { invoice: 'INV-002', status: 'معلق', amount: 242 },
  { invoice: 'INV-003', status: 'قيد المعالجة', amount: 837 },
  { invoice: 'INV-004', status: 'مدفوع', amount: 874 },
  { invoice: 'INV-005', status: 'فشل', amount: 721 },
  { invoice: 'INV-006', status: 'معلق', amount: 150 },
  { invoice: 'INV-007', status: 'مدفوع', amount: 450 },
  { invoice: 'INV-008', status: 'قيد المعالجة', amount: 680 },
  { invoice: 'INV-009', status: 'فشل', amount: 325 },
  { invoice: 'INV-010', status: 'مدفوع', amount: 960 },
  { invoice: 'INV-011', status: 'معلق', amount: 180 },
  { invoice: 'INV-012', status: 'مدفوع', amount: 540 }
]

const sorting = ref<SortingState>([])
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 5 })
</script>
<template>
  <DirectionProvider dir="rtl">
    <Table
      v-model:sorting="sorting"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
    />
  </DirectionProvider>
</template>
