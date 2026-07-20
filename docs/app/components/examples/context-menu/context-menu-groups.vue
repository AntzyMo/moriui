<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger
} from 'moriui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        在文本区域右键点击
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuLabel>编辑</ContextMenuLabel>
        <ContextMenuItem>撤销</ContextMenuItem>
        <ContextMenuItem>重做</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>剪切</ContextMenuItem>
        <ContextMenuItem>复制</ContextMenuItem>
        <ContextMenuItem>粘贴</ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuLabel>查看</ContextMenuLabel>
        <ContextMenuItem>放大</ContextMenuItem>
        <ContextMenuItem>缩小</ContextMenuItem>
        <ContextMenuItem>适应窗口</ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  </ContextMenu>
</template>
