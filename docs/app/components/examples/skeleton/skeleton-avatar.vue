<script setup lang="ts">
  import { Skeleton } from 'moriui'
</script>

<template>
  <div class="flex items-center gap-3">
    <Skeleton class="size-10 rounded-full" /><div class="grid gap-2">
      <Skeleton class="h-4 w-32" /><Skeleton class="h-3 w-24" />
    </div>
  </div>
</template>
