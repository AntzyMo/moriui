<script setup lang="ts">
  import { Alert, AlertDescription, AlertTitle, DirectionProvider } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <Alert>
      <AlertTitle>تنبيه</AlertTitle>
      <AlertDescription>هذا إشعار تجريبي في الاتجاه من اليمين إلى اليسار.</AlertDescription>
    </Alert>
  </DirectionProvider>
</template>
