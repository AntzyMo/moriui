<script setup lang="ts">
  import { CheckCircle } from '@lucide/vue'
  import { Marker, MarkerContent, MarkerIcon } from 'moriui'
</script>

<template>
  <Marker><MarkerIcon><CheckCircle class="size-4" aria-hidden="true" /></MarkerIcon><MarkerContent>部署完成</MarkerContent></Marker>
</template>
