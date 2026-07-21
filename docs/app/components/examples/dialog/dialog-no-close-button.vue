<script setup lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from 'moriui'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        编辑
      </Button>
    </DialogTrigger>
    <DialogContent show-close-button="false">
      <DialogHeader>
        <DialogTitle>无关闭按钮</DialogTitle>
        <DialogDescription>用户必须通过其他操作关闭此对话框。</DialogDescription>
      </DialogHeader>
      <p class="text-sm text-muted-foreground">
        内容区域
      </p>
    </DialogContent>
  </Dialog>
</template>
