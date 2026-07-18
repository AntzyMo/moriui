<script setup lang="ts">
  import { Button } from 'moriui'
  import { ArrowUp } from '@lucide/vue'
</script>

<template>
  <div class="flex items-center gap-2">
    <Button size="sm" variant="outline">
      按钮
    </Button>
    <Button size="icon-sm" variant="outline" aria-label="提交">
      <ArrowUp />
    </Button>
  </div>
</template>
