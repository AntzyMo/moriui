<script setup lang="ts">
import { DirectionProvider, Alert, AlertDescription, AlertTitle } from 'moriui'
</script>
<template>
  <DirectionProvider dir="rtl">
    <Alert>
      <AlertTitle>تنبيه</AlertTitle>
      <AlertDescription>هذا إشعار تجريبي في الاتجاه من اليمين إلى اليسار.</AlertDescription>
    </Alert>
  </DirectionProvider>
</template>
