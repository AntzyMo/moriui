<script setup lang="ts">
  import { AspectRatio } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>AspectRatio</h2>
    <div class="playground__stack">
      <AspectRatio :ratio="16 / 9" class="flex items-center justify-center rounded-xl border bg-muted text-sm font-medium">
        16:9 媒体容器
      </AspectRatio>
    </div>
  </section>
</template>
