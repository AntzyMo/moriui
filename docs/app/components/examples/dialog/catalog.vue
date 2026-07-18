<script setup lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
  } from 'moriui'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="sm" variant="outline">
        查看详情
      </Button>
    </DialogTrigger><DialogContent><DialogTitle>保持上下文</DialogTitle><DialogDescription>对话框会管理焦点并归还给触发器。</DialogDescription></DialogContent>
  </Dialog>
</template>
