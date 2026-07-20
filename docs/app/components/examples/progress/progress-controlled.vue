<script setup lang="ts">
import { ref } from 'vue'
import { Progress, ProgressIndicator, ProgressTrack } from 'moriui'

const value = ref(50)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <Progress v-model="value" class="w-full">
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
    <div class="flex items-center gap-3">
      <span class="text-sm">0%</span>
      <input
        type="range"
        v-model.number="value"
        min="0"
        max="100"
        step="1"
        class="w-full"
      />
      <span class="text-sm">100%</span>
    </div>
  </div>
</template>
