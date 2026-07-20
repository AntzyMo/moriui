<script setup lang="ts">
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from 'moriui'

const items = [
  { label: '保存当前', shortcut: '⌘S' },
  { label: '打印文档', shortcut: '⌘P' },
  { label: '查找替换', shortcut: '⌘H' },
  { label: '全屏模式', shortcut: '⌃⌘F' },
  { label: '开发者工具', shortcut: '⌘⇧I' },
  { label: '快速打开', shortcut: '⌘K' }
]
</script>
<template>
  <Command class="rounded-lg border shadow-sm w-full max-w-sm">
    <CommandInput placeholder="搜索快捷键…" />
    <CommandList>
      <CommandEmpty>无匹配结果</CommandEmpty>
      <CommandGroup heading="快捷键">
        <CommandItem v-for="item in items" :key="item.label" :value="item.label">
          {{ item.label }}<CommandShortcut>{{ item.shortcut }}</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
