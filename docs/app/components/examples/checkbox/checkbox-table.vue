<script setup lang="ts">
  import { ref } from 'vue'
  import { Checkbox } from 'moriui'

  const rows = ref([
    { id: 1, name: '林晓', role: '管理员', selected: true },
    { id: 2, name: '周然', role: '编辑', selected: false },
    { id: 3, name: '陈屿', role: '成员', selected: false }
  ])
</script>

<template>
  <table class="w-full max-w-md text-sm">
    <thead>
      <tr class="border-b">
        <th class="p-2 text-start">
          选择
        </th><th class="p-2 text-start">
          姓名
        </th><th class="p-2 text-start">
          角色
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id" class="border-b">
        <td class="p-2">
          <Checkbox v-model="row.selected" :aria-label="`选择${row.name}`" />
        </td><td class="p-2">
          {{ row.name }}
        </td><td class="p-2">
          {{ row.role }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
