<script setup lang="ts">
  import type { ColumnDef, RowSelectionState } from 'moriui'

  import { Table } from 'moriui'
  import { shallowRef } from 'vue'

  interface Project {
    id: string
    name: string
    owner: string
    status: string
    updatedAt: string
  }

  const rowSelection = shallowRef<RowSelectionState>({})
  const projects = shallowRef<Project[]>([
    { id: 'moriui', name: 'MoriUI', owner: '林默', status: '进行中', updatedAt: '今天' },
    { id: 'nova', name: 'Nova 主题', owner: '苏晴', status: '待审核', updatedAt: '今天' },
    { id: 'dashboard', name: '运营看板', owner: '顾言', status: '进行中', updatedAt: '昨天' },
    { id: 'docs', name: '组件文档', owner: '陈澈', status: '已完成', updatedAt: '昨天' },
    { id: 'tokens', name: '设计 Token', owner: '许诺', status: '进行中', updatedAt: '周一' },
    { id: 'charts', name: '图表系统', owner: '周宁', status: '待审核', updatedAt: '周一' },
    { id: 'mobile', name: '移动端适配', owner: '宋然', status: '进行中', updatedAt: '上周五' },
    { id: 'search', name: '全局搜索', owner: '陆川', status: '已完成', updatedAt: '上周五' },
    { id: 'billing', name: '账单中心', owner: '叶知', status: '进行中', updatedAt: '上周四' },
    { id: 'audit', name: '审计日志', owner: '沈星', status: '待审核', updatedAt: '上周四' },
    { id: 'export', name: '数据导出', owner: '方圆', status: '已完成', updatedAt: '上周三' },
    { id: 'access', name: '权限中心', owner: '韩松', status: '进行中', updatedAt: '上周三' }
  ])

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: 'name',
      header: '项目',
      cell: context => String(context.getValue()),
      meta: { filter: { placeholder: '筛选项目' } }
    },
    {
      accessorKey: 'owner',
      header: '负责人',
      cell: context => String(context.getValue()),
      meta: { filter: { placeholder: '筛选负责人' } }
    },
    {
      accessorKey: 'status',
      header: '状态',
      cell: context => String(context.getValue()),
      meta: { filter: { placeholder: '筛选状态' } }
    },
    {
      accessorKey: 'updatedAt',
      header: '最近更新',
      cell: context => String(context.getValue())
    }
  ]
</script>

<template>
  <section class="playground__section">
    <h2>Table</h2>
    <div class="playground__table-example">
      <Table
        v-model:row-selection="rowSelection"
        :columns="columns"
        :data="projects"
        :get-row-id="row => row.id"
        selectable
      >
        <template #toolbar="{ table }">
          <output class="playground__example-label">
            已选择 {{ Object.keys(table.getState().rowSelection).length }} 个项目
          </output>
        </template>
      </Table>
    </div>
  </section>
</template>
