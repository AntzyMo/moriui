<script setup lang="ts">
  import { Button, toast } from 'moriui'

  function showPromiseToast() {
    toast.promise(
      () => new Promise<{ name: string }>(resolve => setTimeout(resolve, 1200, { name: '项目' })),
      {
        error: '项目保存失败',
        loading: '正在保存项目…',
        success: (data: { name: string }) => `${data.name}已保存`
      }
    )
  }
</script>

<template>
  <section class="playground__section">
    <h2>Sonner</h2>
    <div class="playground__row">
      <Button variant="outline" @click="toast('活动已创建')">
        默认
      </Button>
      <Button variant="outline" @click="toast.success('更改已保存')">
        成功
      </Button>
      <Button variant="outline" @click="toast.info('将在十分钟后开始')">
        信息
      </Button>
      <Button variant="outline" @click="toast.warning('存储空间不足')">
        警告
      </Button>
      <Button variant="outline" @click="toast.error('无法保存更改')">
        错误
      </Button>
      <Button variant="outline" @click="showPromiseToast">
        Promise
      </Button>
    </div>
  </section>
</template>
