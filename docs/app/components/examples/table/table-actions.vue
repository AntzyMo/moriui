<script setup lang="ts">
  import type { ColumnDef } from 'moriui'

  import { h } from 'vue'
  import { createColumnHelper } from '@tanstack/vue-table'
  import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from '@lucide/vue'
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Table
  } from 'moriui'

  interface Product {
    name: string
    price: number
    stock: number
  }

  const columnHelper = createColumnHelper<Product>()

  const columns: ColumnDef<Product>[] = [
    columnHelper.accessor('name', {
      header: '产品名称',
      cell: ctx => String(ctx.getValue())
    }),
    columnHelper.accessor('price', {
      header: '单价',
      cell: ctx => `¥${(ctx.getValue() as number).toFixed(2)}`
    }),
    columnHelper.accessor('stock', {
      header: '库存',
      cell: ctx => String(ctx.getValue())
    }),
    columnHelper.display({
      id: 'actions',
      header: '操作',
      cell: () => h(DropdownMenu, {}, {
        default: () => [
          h(DropdownMenuTrigger, {
            render: () => h(Button, { 'variant': 'ghost', 'size': 'icon-sm', 'class': 'size-8', 'aria-label': '操作菜单' })
          }, { default: () => h(MoreHorizontal) }),
          h(DropdownMenuContent, { align: 'end' }, {
            default: () => [
              h(DropdownMenuItem, { onClick: () => {} }, { default: () => [h(Eye, { class: 'mr-2 size-4' }), '查看详情'] }),
              h(DropdownMenuItem, { onClick: () => {} }, { default: () => [h(Pencil, { class: 'mr-2 size-4' }), '编辑'] }),
              h(DropdownMenuItem, { onClick: () => {} }, { default: () => [h(Copy, { class: 'mr-2 size-4' }), '复制'] }),
              h(DropdownMenuSeparator),
              h(DropdownMenuItem, { variant: 'destructive', onClick: () => {} }, { default: () => [h(Trash2, { class: 'mr-2 size-4' }), '删除'] })
            ]
          })
        ]
      })
    })
  ]

  const data: Product[] = [
    { name: '无线鼠标', price: 29.99, stock: 128 },
    { name: '机械键盘', price: 129.99, stock: 56 },
    { name: 'USB-C 集线器', price: 49.99, stock: 203 },
    { name: '4K 显示器', price: 399.99, stock: 32 },
    { name: '降噪耳机', price: 89.99, stock: 78 }
  ]
</script>

<template>
  <Table :data="data" :columns="columns" />
</template>
