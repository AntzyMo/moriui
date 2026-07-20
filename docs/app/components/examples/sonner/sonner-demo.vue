<script setup lang="ts">
import { Button, Sonner, toast } from 'moriui'
</script>

<template>
  <Sonner />
  <Button variant="outline" size="sm" @click="toast('事件已创建', {
    description: '2023 年 12 月 3 日星期日上午 9:00',
    action: {
      label: '撤销',
      onClick: () => console.log('撤销')
    }
  })">
    显示通知
  </Button>
</template>
