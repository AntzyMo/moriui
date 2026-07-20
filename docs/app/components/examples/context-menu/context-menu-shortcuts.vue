<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger
} from 'moriui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        右键查看快捷键
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        撤销
        <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        重做
        <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        剪切
        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        复制
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        粘贴
        <ContextMenuShortcut>⌘V</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        全选
        <ContextMenuShortcut>⌘A</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        查找
        <ContextMenuShortcut>⌘F</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
