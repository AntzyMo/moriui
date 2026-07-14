<script setup lang="ts">
  import { Skeleton } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Skeleton</h2>
    <div class="playground__skeleton-examples">
      <div class="playground__skeleton-profile">
        <Skeleton class="size-10 shrink-0 rounded-full" />
        <div class="grid flex-1 gap-2">
          <Skeleton class="h-3 w-32" />
          <Skeleton class="h-3 w-48" />
        </div>
      </div>
      <Skeleton class="h-28 w-full" />
    </div>
  </section>
</template>
