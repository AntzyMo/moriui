<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Progress, ProgressIndicator, ProgressTrack } from 'moriui'

const value = ref(13)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    value.value = value.value >= 90 ? 0 : value.value + 10
  }, 800)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <Progress v-model="value" class="w-3/5">
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </Progress>
</template>
