<script setup lang="ts">
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, DirectionProvider } from 'moriui'
</script>
<template>
  <DirectionProvider dir="rtl">
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button variant="outline">حذف</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد الحذف؟</AlertDialogTitle>
          <AlertDialogDescription>لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </DirectionProvider>
</template>
