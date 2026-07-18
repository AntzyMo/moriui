<script setup lang="ts">
  import { Button } from 'moriui'
  import { GitBranch, GitFork } from '@lucide/vue'
</script>

<template>
  <div class="flex gap-2">
    <Button variant="outline">
      <GitBranch data-icon="inline-start" />新建分支
    </Button>
    <Button variant="outline">
      复刻<GitFork data-icon="inline-end" />
    </Button>
  </div>
</template>
