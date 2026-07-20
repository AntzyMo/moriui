<script setup lang="ts">
import { shallowRef } from 'vue'
import { Button, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'moriui'

const open = shallowRef(false)
</script>
<template>
  <Button size="sm" variant="outline" @click="open = true">
    打开命令面板
  </Button>
  <CommandDialog v-model:open="open">
    <Command class="rounded-lg border shadow-md">
      <CommandInput placeholder="输入命令搜索…" />
      <CommandList>
        <CommandEmpty>无结果</CommandEmpty>
        <CommandGroup heading="快捷操作">
          <CommandItem>新建项目</CommandItem>
          <CommandItem>切换主题</CommandItem>
          <CommandItem>查看设置</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </CommandDialog>
</template>
