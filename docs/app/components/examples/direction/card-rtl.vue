<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DirectionProvider
  } from 'moriui'
</script>

<template>
  <DirectionProvider direction="rtl">
    <Card dir="rtl" class="w-full max-w-sm">
      <CardHeader><CardTitle>بطاقة المشروع</CardTitle><CardDescription>اتجاه المحتوى من اليمين إلى اليسار.</CardDescription></CardHeader>
      <CardContent>آخر تحديث اليوم</CardContent>
    </Card>
  </DirectionProvider>
</template>
