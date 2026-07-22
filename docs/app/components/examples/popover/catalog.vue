<script setup lang="ts">
  import { Popover, PopoverContent, PopoverTrigger } from 'moriui'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button class="inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background outline-none">
        打开 Popover
      </button>
    </PopoverTrigger>
    <PopoverContent class="w-64">
      内容区域
    </PopoverContent>
  </Popover>
</template>
