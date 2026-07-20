<script setup lang="ts">
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from 'moriui'
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">查看条款</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>服务条款</DialogTitle>
        <DialogDescription>请仔细阅读以下条款。</DialogDescription>
      </DialogHeader>
      <div class="grid gap-4">
        <p v-for="i in 20" :key="i" class="text-sm text-muted-foreground">这是第 {{ i }} 条条款的内容。请仔细阅读并确认同意。</p>
      </div>
    </DialogContent>
  </Dialog>
</template>
