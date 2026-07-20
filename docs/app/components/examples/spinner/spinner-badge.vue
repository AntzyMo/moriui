<script setup lang="ts">
import { Badge, Spinner } from 'moriui'
</script>

<template>
  <div class="flex items-center gap-4">
    <Badge>
      <Spinner data-icon="inline-start" />同步中
    </Badge>
    <Badge variant="secondary">
      <Spinner data-icon="inline-start" />更新中
    </Badge>
    <Badge variant="outline">
      <Spinner data-icon="inline-start" />处理中
    </Badge>
  </div>
</template>
