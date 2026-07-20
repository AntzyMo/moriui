<script setup lang="ts">
import { Button, Sonner, toast } from 'moriui'
</script>

<template>
  <Sonner />
  <div class="flex flex-wrap gap-2">
    <Button variant="outline" size="sm" @click="toast('默认通知')">
      默认
    </Button>
    <Button variant="outline" size="sm" @click="toast.success('操作成功')">
      成功
    </Button>
    <Button variant="outline" size="sm" @click="toast.info('请在活动开始前 10 分钟到达现场')">
      信息
    </Button>
    <Button variant="outline" size="sm" @click="toast.warning('活动开始时间不能早于上午 8 点')">
      警告
    </Button>
    <Button variant="outline" size="sm" @click="toast.error('操作失败')">
      错误
    </Button>
    <Button variant="outline" size="sm" @click="toast.promise<{ name: string }>(
      () => new Promise(resolve => setTimeout(() => resolve({ name: '活动' }), 2000)),
      {
        loading: '加载中…',
        success: data => `${data.name}已创建`,
        error: '创建失败'
      }
    )">
      异步
    </Button>
  </div>
</template>
