<script setup lang="ts">
  import { Badge } from 'moriui'
  import { LoaderCircle } from '@lucide/vue'
</script>

<template>
  <Badge variant="secondary">
    <LoaderCircle class="size-3 animate-spin" aria-hidden="true" /> 同步中
  </Badge>
</template>
