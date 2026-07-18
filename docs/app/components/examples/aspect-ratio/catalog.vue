<script setup lang="ts">
  import { AspectRatio } from 'moriui'
</script>

<template>
  <AspectRatio :ratio="16 / 9" class="w-32 overflow-hidden rounded-md bg-muted">
    <div class="flex h-full items-center justify-center text-xs text-muted-foreground">
      16:9
    </div>
  </AspectRatio>
</template>
