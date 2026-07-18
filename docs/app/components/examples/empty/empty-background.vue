<script setup lang="ts">
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle
  } from 'moriui'
</script>

<template>
  <Empty class="w-full max-w-md bg-muted/50">
    <EmptyHeader><EmptyTitle>没有匹配结果</EmptyTitle><EmptyDescription>尝试减少筛选条件。</EmptyDescription></EmptyHeader>
  </Empty>
</template>
