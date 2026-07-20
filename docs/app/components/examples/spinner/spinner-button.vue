<script setup lang="ts">
import { Button, Spinner } from 'moriui'
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <Button disabled size="sm" variant="outline">
        <Spinner data-icon="inline-start" />加载中…
      </Button>
      <Button disabled size="sm" variant="secondary">
        <Spinner data-icon="inline-start" />请稍候
      </Button>
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />处理中
      </Button>
    </div>
  </div>
</template>
