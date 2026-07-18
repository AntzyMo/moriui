<script setup lang="ts">
  import { AspectRatio } from 'moriui'
</script>

<template>
  <AspectRatio :ratio="9 / 16" class="mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-muted">
    <div dir="rtl" class="flex h-full items-center justify-center bg-gradient-to-br from-muted to-secondary text-sm text-muted-foreground">
      9:16 من اليمين
    </div>
  </AspectRatio>
</template>
