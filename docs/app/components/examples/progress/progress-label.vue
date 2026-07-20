<script setup lang="ts">
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from 'moriui'
</script>

<template>
  <Progress :model-value="56" class="w-full max-w-sm">
    <ProgressLabel>上传进度</ProgressLabel>
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
    <ProgressValue />
  </Progress>
</template>
