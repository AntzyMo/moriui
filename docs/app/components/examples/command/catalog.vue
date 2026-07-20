<script setup lang="ts">
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'moriui'
</script>
<template>
  <Command class="rounded-lg border">
    <CommandInput placeholder="搜索…" />
    <CommandList>
      <CommandEmpty>无结果</CommandEmpty>
      <CommandGroup heading="快速操作"><CommandItem value="settings">设置</CommandItem></CommandGroup>
    </CommandList>
  </Command>
</template>
