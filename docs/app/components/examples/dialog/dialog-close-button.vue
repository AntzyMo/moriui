<script setup lang="ts">
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from 'moriui'
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">分享</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>分享链接</DialogTitle>
        <DialogDescription>拥有此链接的人可以查看此内容。</DialogDescription>
      </DialogHeader>
      <div class="flex items-center gap-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">链接</Label>
          <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readonly />
        </div>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button">关闭</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
