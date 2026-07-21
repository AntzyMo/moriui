<script setup lang="ts">
  import {
    Copy,
    ExternalLink,
    FilePen,
    Import,
    Trash2
  } from '@lucide/vue'
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
  } from 'moriui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        在项目文件上右键点击
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        <FilePen class="mr-1.5 size-4" />
        编辑文件
      </ContextMenuItem>
      <ContextMenuItem>
        <ExternalLink class="mr-1.5 size-4" />
        在新窗口打开
      </ContextMenuItem>
      <ContextMenuItem>
        <Copy class="mr-1.5 size-4" />
        复制路径
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <Import class="mr-1.5 size-4" />
        导出
      </ContextMenuItem>
      <ContextMenuItem class="text-destructive focus:text-destructive-foreground">
        <Trash2 class="mr-1.5 size-4" />
        移出项目
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
