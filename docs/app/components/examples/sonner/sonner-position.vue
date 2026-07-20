<script setup lang="ts">
import { Button, Sonner, toast } from 'moriui'
</script>

<template>
  <Sonner />
  <div class="flex flex-wrap justify-center gap-2">
    <Button variant="outline" size="sm" @click="toast('事件已创建', { position: 'top-left' })">
      左上
    </Button>
    <Button variant="outline" size="sm" @click="toast('事件已创建', { position: 'top-center' })">
      顶部居中
    </Button>
    <Button variant="outline" size="sm" @click="toast('事件已创建', { position: 'top-right' })">
      右上
    </Button>
    <Button variant="outline" size="sm" @click="toast('事件已创建', { position: 'bottom-left' })">
      左下
    </Button>
    <Button variant="outline" size="sm" @click="toast('事件已创建', { position: 'bottom-center' })">
      底部居中
    </Button>
    <Button variant="outline" size="sm" @click="toast('事件已创建', { position: 'bottom-right' })">
      右下
    </Button>
  </div>
</template>
