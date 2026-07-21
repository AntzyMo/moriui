<script setup lang="ts">
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
  } from 'moriui'
</script>

<template>
  <Command class="rounded-lg border shadow-md">
    <CommandInput placeholder="输入命令搜索…" />
    <CommandList>
      <CommandEmpty>无结果</CommandEmpty>
      <CommandGroup heading="建议">
        <CommandItem>日历<CommandShortcut>⌘C</CommandShortcut></CommandItem>
        <CommandItem>搜索邮件<CommandShortcut>⌘E</CommandShortcut></CommandItem>
        <CommandItem>计算器<CommandShortcut>⌘K</CommandShortcut></CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="设置">
        <CommandItem>个人资料<CommandShortcut>⌘P</CommandShortcut></CommandItem>
        <CommandItem>账单<CommandShortcut>⌘B</CommandShortcut></CommandItem>
        <CommandItem disabled>
          API<CommandShortcut>⌘A</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
