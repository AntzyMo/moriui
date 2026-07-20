<script setup lang="ts">
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from 'moriui'
</script>
<template>
  <ContextMenu>
    <ContextMenuTrigger><div class="rounded border border-dashed p-8 text-center text-sm text-muted-foreground">右键点击</div></ContextMenuTrigger>
    <ContextMenuContent><ContextMenuItem>操作</ContextMenuItem></ContextMenuContent>
  </ContextMenu>
</template>
