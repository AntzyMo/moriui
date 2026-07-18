<script setup lang="ts">
  import { Search } from '@lucide/vue'
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from 'moriui'
</script>

<template>
  <Empty class="w-full max-w-md">
    <EmptyHeader><EmptyTitle>搜索文档</EmptyTitle><EmptyDescription>输入关键词开始查找。</EmptyDescription></EmptyHeader><EmptyContent class="w-full">
      <InputGroup><InputGroupAddon><Search class="size-4" /></InputGroupAddon><InputGroupInput aria-label="搜索文档" placeholder="输入关键词" /></InputGroup>
    </EmptyContent>
  </Empty>
</template>
