<script setup lang="ts">
  import { Separator } from 'moriui'
</script>

<template>
  <nav aria-label="账户菜单" class="flex items-center gap-3 text-sm">
    <a href="#profile">资料</a><Separator orientation="vertical" /><a href="#settings">设置</a><Separator orientation="vertical" /><a href="#logout">退出</a>
  </nav>
</template>
