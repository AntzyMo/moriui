<script setup lang="ts">
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from 'moriui'
</script>
<template>
  <AlertDialog>
    <AlertDialogTrigger as-child><Button size="sm" variant="outline">确认</Button></AlertDialogTrigger>
    <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>确认？</AlertDialogTitle></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction>继续</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
  </AlertDialog>
</template>
