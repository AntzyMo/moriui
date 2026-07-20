<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from 'moriui'
</script>
<template>
  <Alert>
    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-13h-2v6h2zm0 8h-2v2h2z"/></svg>
    <AlertTitle>注意</AlertTitle>
    <AlertDescription>这是一个标准通知提示。</AlertDescription>
  </Alert>
</template>
