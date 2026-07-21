<script setup lang="ts">
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
  } from 'moriui'

  const items = Array.from({ length: 30 }, (_, i) => `命令 ${i + 1}`)
</script>

<template>
  <Command class="rounded-lg border shadow-sm w-full max-w-sm">
    <CommandInput placeholder="搜索命令…" />
    <CommandList class="max-h-60">
      <CommandEmpty>无匹配结果</CommandEmpty>
      <CommandGroup heading="全部命令">
        <CommandItem v-for="item in items" :key="item" :value="item">
          {{ item }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
