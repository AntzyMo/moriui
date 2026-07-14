<script setup lang="ts">
  import { Inbox, Plus } from '@lucide/vue'
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
  <section class="playground__section">
    <h2>Empty</h2>
    <Empty class="min-h-72 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>暂无收件箱内容</EmptyTitle>
        <EmptyDescription>
          你已处理所有邮件，新邮件会显示在这里。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div class="flex gap-2">
          <Button size="sm">
            <Plus aria-hidden="true" />
            新建邮件
          </Button>
          <Button size="sm" variant="outline">
            导入邮件
          </Button>
        </div>
        <EmptyDescription>
          需要帮助？<a href="#empty-help">查看使用说明</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  </section>
</template>
