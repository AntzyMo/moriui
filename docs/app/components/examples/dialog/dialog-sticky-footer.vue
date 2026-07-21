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
      <Button variant="outline">
        编辑资料
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>编辑资料</DialogTitle>
        <DialogDescription>修改以下内容。</DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <p v-for="i in 6" :key="i" class="h-8 rounded bg-muted" />
      </div>
      <DialogFooter>
        <Button type="submit">
          保存
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
