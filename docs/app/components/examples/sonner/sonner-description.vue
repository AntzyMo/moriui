<script setup lang="ts">
import { Button, Sonner, toast } from 'moriui'
</script>

<template>
  <Sonner />
  <div class="flex flex-wrap gap-2">
    <Button variant="outline" size="sm" @click="toast('事件已创建', {
      description: '2023 年 1 月 3 日星期一下午 6:00'
    })">
      仅描述
    </Button>
    <Button variant="outline" size="sm" @click="toast('文件已上传', {
      description: '报告文档已保存到项目文件夹',
      action: {
        label: '打开',
        onClick: () => console.log('打开文件')
      }
    })">
      带操作按钮
    </Button>
  </div>
</template>
