<script setup lang="ts">
  import { Button } from 'moriui'
  import { ArrowUp } from '@lucide/vue'
</script>

<template>
  <div class="flex gap-2">
    <Button class="rounded-full">
      开始使用
    </Button>
    <Button
      class="rounded-full"
      size="icon"
      variant="outline"
      aria-label="继续"
    >
      <ArrowUp />
    </Button>
  </div>
</template>
