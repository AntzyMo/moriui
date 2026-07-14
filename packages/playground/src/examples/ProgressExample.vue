<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    Progress,
    ProgressIndicator,
    ProgressLabel,
    ProgressTrack,
    ProgressValue
  } from 'moriui'

  const uploadProgress = shallowRef(64)

  function advanceUpload() {
    uploadProgress.value = uploadProgress.value >= 100 ? 0 : Math.min(uploadProgress.value + 12, 100)
  }
</script>

<template>
  <section class="playground__section">
    <h2>Progress</h2>
    <div class="playground__stack">
      <div class="grid gap-2">
        <p class="playground__example-label">
          可控上传进度
        </p>
        <Progress v-model="uploadProgress">
          <ProgressLabel>正在上传 product-assets.zip</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <div class="playground__row">
          <Button size="sm" @click="advanceUpload">
            推进 12%
          </Button>
          <Button size="sm" variant="outline" @click="uploadProgress = 0">
            重置
          </Button>
        </div>
      </div>

      <div class="grid gap-2">
        <p class="playground__example-label">
          自定义最大值
        </p>
        <Progress :model-value="8" :max="12">
          <ProgressLabel>已处理任务</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>

      <div class="grid gap-2">
        <p class="playground__example-label">
          不定进度
        </p>
        <Progress>
          <ProgressLabel>正在分析文件</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </div>
  </section>
</template>
