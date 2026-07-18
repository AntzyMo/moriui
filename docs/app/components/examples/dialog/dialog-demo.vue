<script setup lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from 'moriui'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>查看详情</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader><DialogTitle>保持上下文</DialogTitle><DialogDescription>对话框会管理焦点，并允许用户按 Escape 返回页面。</DialogDescription></DialogHeader>
      <p class="text-sm text-muted-foreground">
        把需要立即关注的短任务放在这里。
      </p>
      <DialogFooter><Button>知道了</Button></DialogFooter>
    </DialogContent>
  </Dialog>
</template>
