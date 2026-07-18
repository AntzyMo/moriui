<script setup lang="ts">
  import { Inbox } from '@lucide/vue'
  import {
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from 'moriui'
</script>

<template>
  <Empty class="w-full max-w-md">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Inbox class="size-5" />
      </EmptyMedia><EmptyTitle>还没有项目</EmptyTitle><EmptyDescription>创建第一个项目后，它会显示在这里。</EmptyDescription>
    </EmptyHeader><EmptyContent>
      <Button size="sm">
        新建项目
      </Button>
    </EmptyContent>
  </Empty>
</template>
