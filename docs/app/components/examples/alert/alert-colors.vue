<script setup lang="ts">
  import { Alert, AlertDescription, AlertTitle } from 'moriui'

  const variants = ['default', 'info', 'success', 'warning', 'destructive'] as const
</script>

<template>
  <div class="grid gap-2">
    <Alert v-for="v in variants" :key="v" :variant="v">
      <AlertTitle class="capitalize">
        {{ v }}
      </AlertTitle>
      <AlertDescription>{{ v === 'destructive' ? '发生了错误。' : '这是一条提示信息。' }}</AlertDescription>
    </Alert>
  </div>
</template>
