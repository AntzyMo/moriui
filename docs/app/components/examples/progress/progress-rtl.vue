<script setup lang="ts">
import { DirectionProvider, Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <Progress :model-value="56" class="w-full max-w-sm">
      <ProgressLabel>تقدم الرفع</ProgressLabel>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
      <ProgressValue />
    </Progress>
  </DirectionProvider>
</template>
