<script setup lang="ts">
  import { Skeleton } from 'moriui'
</script>

<template>
  <div dir="rtl" class="flex items-center gap-3">
    <Skeleton class="size-10 rounded-full" /><div class="grid gap-2">
      <Skeleton class="h-4 w-40" /><Skeleton class="h-3 w-28" />
    </div>
  </div>
</template>
