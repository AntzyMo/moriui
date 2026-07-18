<script setup lang="ts">
  import { Skeleton } from 'moriui'
</script>

<template>
  <div class="w-full max-w-sm space-y-4">
    <div class="space-y-2">
      <Skeleton class="h-4 w-20" /><Skeleton class="h-9 w-full" />
    </div><Skeleton class="h-9 w-24" />
  </div>
</template>
