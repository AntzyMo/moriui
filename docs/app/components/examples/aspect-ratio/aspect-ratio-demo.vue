<script setup lang="ts">
  import { AspectRatio } from 'moriui'
</script>

<template>
  <AspectRatio :ratio="16 / 9" class="mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-muted">
    <div class="flex h-full items-center justify-center bg-gradient-to-br from-muted to-secondary text-sm text-muted-foreground">
      16:9 横向封面
    </div>
  </AspectRatio>
</template>
