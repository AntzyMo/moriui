<script setup lang="ts">
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
  } from 'moriui'

  const actions = ['新建文件', '打开项目', '保存当前', '撤销操作', '重做操作']
</script>

<template>
  <Command class="rounded-lg border shadow-sm w-full max-w-sm">
    <CommandInput placeholder="搜索操作…" />
    <CommandList>
      <CommandEmpty>无匹配操作</CommandEmpty>
      <CommandGroup heading="常用操作">
        <CommandItem v-for="item in actions" :key="item" :value="item">
          {{ item }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
