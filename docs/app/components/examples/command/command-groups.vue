<script setup lang="ts">
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
  } from 'moriui'

  const groups = [
    {
      heading: '页面',
      items: ['仪表盘', '项目列表', '任务看板']
    },
    {
      heading: '工具',
      items: ['搜索文件', '全局替换', '代码片段']
    },
    {
      heading: '账户',
      items: ['个人设置', '团队管理', '退出登录']
    }
  ]
</script>

<template>
  <Command class="rounded-lg border shadow-sm w-full max-w-sm">
    <CommandInput placeholder="搜索命令…" />
    <CommandList>
      <CommandEmpty>无匹配结果</CommandEmpty>
      <template v-for="(group, index) in groups" :key="group.heading">
        <CommandGroup :heading="group.heading">
          <CommandItem v-for="item in group.items" :key="item" :value="item">
            {{ item }}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator v-if="index < groups.length - 1" />
      </template>
    </CommandList>
  </Command>
</template>
