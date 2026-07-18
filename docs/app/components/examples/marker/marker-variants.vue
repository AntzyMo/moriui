<script setup lang="ts">
  import { Marker, MarkerContent } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-md gap-3">
    <Marker><MarkerContent>默认标记</MarkerContent></Marker><Marker variant="border">
      <MarkerContent>描边标记</MarkerContent>
    </Marker><Marker variant="separator">
      <MarkerContent>分隔标记</MarkerContent>
    </Marker>
  </div>
</template>
