<script setup lang="ts">
  import { ScrollArea } from 'moriui'
</script>

<template>
  <ScrollArea class="w-96 rounded-md border whitespace-nowrap" orientation="horizontal">
    <div class="inline-flex gap-4 p-4">
      <div
        v-for="i in 6"
        :key="i"
        class="min-w-[12rem] shrink-0 rounded-md border p-4"
      >
        <div class="mb-3 h-32 rounded-md bg-neutral-100 dark:bg-neutral-800" />
        <p class="mb-1 text-sm font-medium">
          项目 {{ i }}
        </p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          描述文字第 {{ i }} 项
        </p>
      </div>
    </div>
  </ScrollArea>
</template>
