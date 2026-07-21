<script setup lang="ts">
  import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from 'moriui'
</script>

<template>
  <Alert>
    <AlertTitle>升级可用</AlertTitle>
    <AlertDescription>新版本 v2.0 可以安装了。</AlertDescription>
    <AlertAction as-child>
      <Button size="sm" variant="outline">
        更新
      </Button>
    </AlertAction>
  </Alert>
</template>
