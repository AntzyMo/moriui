<script setup lang="ts">
  import { Button, useMessageScroller } from 'moriui'

  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button size="sm" variant="outline" @click="scrollToStart({ behavior: 'smooth' })">
      到开头
    </Button>
    <Button size="sm" variant="outline" @click="scrollToMessage('command-2', { align: 'center', behavior: 'smooth' })">
      到第二条
    </Button>
    <Button size="sm" variant="outline" @click="scrollToEnd({ behavior: 'smooth' })">
      到最新
    </Button>
  </div>
</template>
