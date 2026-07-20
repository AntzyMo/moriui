<script setup lang="ts">
import { Table } from 'moriui'
import type { ColumnDef } from 'moriui'

interface Task {
  name: string
  status: string
  priority: string
}

const columns: ColumnDef<Task>[] = [
  { accessorKey: 'name', header: '任务名称', cell: ctx => String(ctx.getValue()) },
  { accessorKey: 'status', header: '状态', cell: ctx => String(ctx.getValue()) },
  { accessorKey: 'priority', header: '优先级', cell: ctx => String(ctx.getValue()) }
]

const data: Task[] = [
  { name: '完成原型设计', status: '进行中', priority: '高' },
  { name: '编写测试用例', status: '待开始', priority: '中' },
  { name: '代码审查', status: '已完成', priority: '低' },
  { name: '部署至预发布', status: '进行中', priority: '高' }
]
</script>
<template>
  <Table :data="data" :columns="columns" size="sm" />
</template>
