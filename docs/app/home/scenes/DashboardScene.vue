<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Progress,
    ProgressIndicator,
    ProgressTrack
  } from 'moriui'

  const progress = shallowRef(68)
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <Card>
      <CardHeader><CardTitle>本周完成度</CardTitle></CardHeader>
      <CardContent class="grid gap-4">
        <p class="text-3xl font-semibold">
          {{ progress }}%
        </p>
        <Progress v-model="progress" :max="100">
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>界面健康度</CardTitle></CardHeader>
      <CardContent class="grid gap-2 text-sm text-muted-foreground">
        <p>键盘路径已验证</p><p>主题 Token 已统一</p><p>静态页面已生成</p>
      </CardContent>
    </Card>
  </div>
</template>
