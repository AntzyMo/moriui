<script setup lang="ts">
  import { Circle } from '@lucide/vue'
  import { Marker, MarkerContent, MarkerIcon } from 'moriui'
</script>

<template>
  <Marker variant="border" aria-label="同步状态">
    <MarkerIcon><Circle class="size-3 fill-current" /></MarkerIcon><MarkerContent>正在同步</MarkerContent>
  </Marker>
</template>
