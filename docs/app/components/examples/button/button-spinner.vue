<script setup lang="ts">
  import { Button } from 'moriui'
  import { LoaderCircle } from '@lucide/vue'
</script>

<template>
  <div class="flex gap-2">
    <Button disabled variant="outline">
      <LoaderCircle class="animate-spin" data-icon="inline-start" />生成中
    </Button>
    <Button disabled variant="secondary">
      下载中<LoaderCircle class="animate-spin" data-icon="inline-end" />
    </Button>
  </div>
</template>
