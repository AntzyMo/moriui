<script setup lang="ts">
  import { Inbox } from '@lucide/vue'
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from 'moriui'
</script>

<template>
  <Empty class="w-full max-w-md border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Inbox class="size-5" />
      </EmptyMedia><EmptyTitle>没有文件</EmptyTitle><EmptyDescription>拖入文件或从设备选择。</EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
