<script setup lang="ts">
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, Button } from 'moriui'
import { AlertTriangle } from '@lucide/vue'
</script>
<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">删除账号</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia><AlertTriangle class="size-6" /></AlertDialogMedia>
        <AlertDialogTitle>确认删除账号？</AlertDialogTitle>
        <AlertDialogDescription>此操作不可撤销，所有数据将被永久删除。</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction>确认删除</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
