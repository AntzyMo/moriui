<script setup lang="ts">
  import { CheckCircle } from '@lucide/vue'
  import { Marker, MarkerContent, MarkerIcon } from 'moriui'
</script>

<template>
  <Marker role="status" aria-live="polite">
    <MarkerIcon><CheckCircle class="size-4" /></MarkerIcon><MarkerContent>所有更改已保存</MarkerContent>
  </Marker>
</template>
