<script setup lang="ts">
  import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from 'moriui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        右键点击此区域
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>打开文件</ContextMenuItem>
      <ContextMenuItem>保存文件</ContextMenuItem>
      <ContextMenuItem>另存为</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>打印</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
